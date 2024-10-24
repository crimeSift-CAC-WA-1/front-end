// ./pages/analyze.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Timeline, TimelineItem } from "@/components/Timeline";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Flag,
  Upload,
  Headphones,
  AlertCircle,
  Maximize2,
  Download,
} from "lucide-react";
import axios from "axios";
import { useReports, AnalysisResult } from "@/contexts/ReportsContext";
import { useRouter } from "next/router";

interface VideoDialogProps {
  src: string;
  platform: string;
}

function VideoDialog({ src, platform }: VideoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer group w-1/2 h-1/2 mx-auto">
          <video
            src={src}
            className="w-full h-full object-cover rounded-lg"
            muted
            loop
            autoPlay
            playsInline
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Maximize2 className="w-12 h-12 text-white" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogTitle className="sr-only">{platform} Tutorial Video</DialogTitle>
        <video src={src} className="w-full" controls autoPlay />
      </DialogContent>
    </Dialog>
  );
}

export default function AnalyzePage() {
  const [selectedPlatform, setSelectedPlatform] = useState("discord");
  const [discordToken, setDiscordToken] = useState("");
  const [serverId, setServerId] = useState("");
  const [channelId, setChannelId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isPlatformBarOpen, setIsPlatformBarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("platforms");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [expandedInstances, setExpandedInstances] = useState<number[]>([]);

  const { addReport } = useReports();
  const router = useRouter();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    setFile(null);
    setAudioFile(null);
    setPrompt("");
    setDiscordToken("");
    setServerId("");
    setChannelId("");
    setError("");
    setAnalysisResults([]);
  }, [selectedPlatform]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (files && files.length > 0) {
        setFile(files[0]);
        setError("");
      }
    } catch (err) {
      setError("Error uploading file. Please try again.");
    }
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (files && files.length > 0) {
        setAudioFile(files[0]);
        setError("");
      }
    } catch (err) {
      setError("Error uploading audio file. Please try again.");
    }
  };

  const toggleInstance = (instanceId: number) => {
    setExpandedInstances((prev) =>
      prev.includes(instanceId)
        ? prev.filter((id) => id !== instanceId)
        : [...prev, instanceId]
    );
  };
  //
  const handleAnalyze = async () => {
    if (!prompt) {
      setError("Please enter a prompt for analysis.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      let response;
      const apiUrl = "https://crimesift-backend.onrender.com";

      if (selectedPlatform === "discord") {
        response = await axios.post(`${apiUrl}/analyzeDiscord`, {
          time: Math.floor(Date.now() / 1000),
          prompt,
          discordToken,
          serverId,
          channelId,
        });
      } else {
        const formData = new FormData();
        formData.append("time", Math.floor(Date.now() / 1000).toString());
        formData.append("prompt", prompt);
        if (file) {
          formData.append("chatData", file);
        }

        response = await axios.post(
          `${apiUrl}/analyze${
            selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)
          }`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      setAnalysisResults(response.data);

      // Add the new report
      addReport({
        id: Date.now().toString(),
        name: `${
          selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)
        } Analysis`,
        date: new Date().toISOString(),
        platform: selectedPlatform,
        results: response.data,
      });

      // Redirect to the reports page
      router.push("/reports");
    } catch (err) {
      setError("An error occurred during analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderPlatformContent = () => {
    switch (selectedPlatform) {
      case "discord":
        return (
          <div className="space-y-6 mb-6 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="fileUpload">Upload Chat Log</Label>
              <Input id="fileUpload" type="file" onChange={handleFileChange} />
            </div>
          </div>
        );
      // return (
      //   <div className="space-y-6 mb-6 animate-fade-in">
      //     <div className="space-y-2">
      //       <Label htmlFor="discordToken">Discord Bot Token</Label>
      //       <Input
      //         id="discordToken"
      //         value={discordToken}
      //         onChange={(e) => setDiscordToken(e.target.value)}
      //         placeholder="Enter your Discord bot token"
      //       />
      //     </div>
      //     <div className="space-y-2">
      //       <Label htmlFor="serverId">Server ID</Label>
      //       <Input
      //         id="serverId"
      //         value={serverId}
      //         onChange={(e) => setServerId(e.target.value)}
      //         placeholder="Enter the server ID"
      //       />
      //     </div>
      //     <div className="space-y-2">
      //       <Label htmlFor="channelId">Channel ID</Label>
      //       <Input
      //         id="channelId"
      //         value={channelId}
      //         onChange={(e) => setChannelId(e.target.value)}
      //         placeholder="Enter the channel ID"
      //       />
      //     </div>
      //   </div>
      // );
      case "instagram":
      case "whatsapp":
        return (
          <div className="space-y-6 mb-6 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="fileUpload">Upload Chat Log</Label>
              <Input id="fileUpload" type="file" onChange={handleFileChange} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold">Analyze Chat Data</h1>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs
        defaultValue="platforms"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsContent value="platforms">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Select Platform</Label>
              <div className="relative">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => setIsPlatformBarOpen(!isPlatformBarOpen)}
                >
                  <span className="flex items-center">
                    <Image
                      src={`/${selectedPlatform}-logo-color.svg`}
                      alt={selectedPlatform}
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    {selectedPlatform.charAt(0).toUpperCase() +
                      selectedPlatform.slice(1)}
                  </span>
                  {isPlatformBarOpen ? <ChevronUp /> : <ChevronDown />}
                </Button>
                {isPlatformBarOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg animate-fade-in">
                    {["discord", "instagram", "whatsapp"].map((platform) => (
                      <Button
                        key={platform}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          setSelectedPlatform(platform);
                          setIsPlatformBarOpen(false);
                        }}
                      >
                        <Image
                          src={`/${platform}-logo-color.svg`}
                          alt={platform}
                          width={24}
                          height={24}
                          className="mr-2"
                        />
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {renderPlatformContent()}
          </div>
        </TabsContent>
        <TabsContent value="audio">
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="audioUpload">Upload Audio File</Label>
              <Input
                id="audioUpload"
                type="file"
                accept="audio/*"
                onChange={handleAudioFileChange}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-4 animate-fade-in mt-8">
        <div className="space-y-2">
          <Label htmlFor="prompt">Analysis Prompt</Label>
          <Input
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your analysis prompt"
            required
          />
        </div>

        <Button
          onClick={handleAnalyze}
          className="w-full animate-pulse-slow"
          disabled={isLoading}
        >
          {isLoading ? "Analyzing..." : "Analyze"}
        </Button>
      </div>

      {analysisResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Analysis Results</h2>
          {analysisResults.map((result) => (
            <div key={result.instance_ID} className="border rounded-lg p-4">
              <Button
                variant="ghost"
                onClick={() => toggleInstance(result.instance_ID)}
                className="w-full flex justify-between items-center"
              >
                <span>Instance {result.instance_ID}</span>
                {expandedInstances.includes(result.instance_ID) ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
              {expandedInstances.includes(result.instance_ID) && (
                <Timeline>
                  {result["context-before"].map((item, index) => (
                    <TimelineItem
                      key={`before-${index}`}
                      time={new Date(item.time * 1000).toLocaleString()}
                      author={item.author}
                      message={item.message}
                      type="context"
                    />
                  ))}
                  {result.flagged.map((item, index) => (
                    <TimelineItem
                      key={`flagged-${index}`}
                      time={new Date(item.time * 1000).toLocaleString()}
                      author={item.author}
                      message={item.message}
                      type="flagged"
                    />
                  ))}
                  {result["context-after"].map((item, index) => (
                    <TimelineItem
                      key={`after-${index}`}
                      time={new Date(item.time * 1000).toLocaleString()}
                      author={item.author}
                      message={item.message}
                      type="context"
                    />
                  ))}
                </Timeline>
              )}
              {result.extractedDataDownloadURL && (
                <div className="mt-4">
                  <a
                    href={result.extractedDataDownloadURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Extracted Data
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedPlatform === "discord" ? (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/ovLFCM10m_Q"
          title="Discord Tutorial Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="object-cover rounded-lg mx-auto"
        ></iframe>
      ) : (
        <VideoDialog
          src={`/${selectedPlatform}-tutorial.mp4`}
          platform={selectedPlatform}
        />
      )}
    </div>
  );
}
