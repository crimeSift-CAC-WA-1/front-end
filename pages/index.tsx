import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Upload, Search, FileText, Headphones, Maximize2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const messages = [
  'Analyze chat data for crime-related messages with ease',
  'Uncover hidden patterns in digital conversations',
  'Speed up your investigative capabilities with AI analysis',
  'Detect potential risks and prevent further criminal activities',
  'Enhance your crime detection with advanced algorithms',
  'Automate the analysis of large volumes of chat data',
  'Improve the accuracy of your investigations',
  'Monitor digital communications for illegal activities',
  'Streamline your investigative process with AI tools',
  'Analyze social media interactions for threats',
  'Uncover the digital footprint of criminals',
  'Analyze voice and text data for criminal intent',
  'Enhance your digital forensics capabilities',
  'Identify potential threats in messages',
];

export default function Home() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2500); // Change message every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 md:space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="gradient-text">CrimeSift</span>
        </h1>
        <div className="h-16 md:h-20 relative overflow-hidden">
          {messages.map((message, index) => (
            <p
              key={index}
              className={`text-xl md:text-2xl text-muted-foreground mb-8 absolute w-full transition-all duration-1000 ease-in-out ${
                index === currentMessageIndex
                  ? 'translate-x-0 opacity-100'
                  : index < currentMessageIndex
                  ? '-translate-x-full opacity-0'
                  : 'translate-x-full opacity-0'
              }`}
            >
              {message}
            </p>
          ))}
        </div>
        <Link href="/analyze">
          <Button size="lg" className="text-lg animate-bounce-slow">
            Start Analyzing
          </Button>
        </Link>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: Upload,
            title: 'Upload Data',
            description: 'Securely upload your chat data',
          },
          {
            icon: Search,
            title: 'Analyze Content',
            description: 'AI-powered content analysis',
          },
          {
            icon: FileText,
            title: 'Generate Reports',
            description: 'Comprehensive analysis reports',
          },
          {
            icon: Headphones,
            title: 'Analyze Audio',
            description: 'Process voice messages and audio files',
          },
        ].map((feature, index) => (
          <Card key={index} className="card-hover">
            <CardHeader>
              <feature.icon className="h-10 w-10 mb-2 text-primary animate-pulse-slow" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Endorsement by Seattle FBI Taskforce Officer / Kirkland PD Officer
        </h2>
        <div className="space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <div className="relative aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer group">
                <video
                  src="/testimony.mp4"
                  className="w-full h-full object-cover rounded-lg"
                  loop
                  controls
                  playsInline
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-12 h-12 text-white" />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <video
                src="/testimony.mp4"
                className="w-full"
                controls
                autoPlay
              />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">
          Audio Transcript
        </h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <audio controls className="w-full mb-4">
            <source src="/sample-audio.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <p className="text-sm md:text-base">
            &ldquo;CrimeSift has revolutionized our investigative process. Its
            AI-powered analysis of chat data has significantly improved our
            ability to detect and prevent criminal activities. I highly
            recommend this tool to all law enforcement agencies looking to
            enhance their digital investigation capabilities.&rdquo;
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {[
            {
              question: 'How do I upload my chat data?',
              answer:
                'You can securely upload your chat data from WhatsApp, Discord, or Instagram directly on their respective platform pages. Simply navigate to the platform you want to analyze and use the file upload option provided.',
            },
            {
              question: 'What kind of analysis does CrimeSift perform?',
              answer:
                'CrimeSift uses advanced AI algorithms to analyze chat content for potential risks, suspicious patterns, and crime-related messages. It can process text, images, and even audio files to provide comprehensive insights.',
            },
            {
              question: 'How can I view the analysis results?',
              answer:
                'After the analysis is complete, you can review the results in the form of detailed reports. These reports highlight flagged messages, potential risks, and provide an overview of the analyzed content.',
            },
            {
              question: 'Is my data safe with CrimeSift?',
              answer:
                'We take data security very seriously. All uploaded data is encrypted and processed securely. We do not store your chat data after analysis, and all temporary files are deleted once the process is complete.',
            },
          ].map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
