// ./pages/reports.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Timeline, TimelineItem } from '@/components/Timeline';
import { useReports } from '@/contexts/ReportsContext';
import { Download, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

export default function ReportsPage() {
  const { reports } = useReports();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedReports, setExpandedReports] = useState<string[]>([]);

  const filteredReports = reports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleReportExpansion = (reportId: string) => {
    setExpandedReports((prev) =>
      prev.includes(reportId)
        ? prev.filter((id) => id !== reportId)
        : [...prev, reportId]
    );
  };

  const printTimeline = (reportId: string, instanceId: string) => {
    const printContent = document.getElementById(`timeline-${reportId}-${instanceId}`);
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Print Timeline</title></head><body>');
      if (printContent) {
        printWindow.document.write(printContent.innerHTML);
      } else {
        console.error('Failed to find print content');
      }
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Failed to open print window');
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold">Analysis Reports</h1>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Input
          type="text"
          placeholder="Search reports..."
          className="flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-6">
        {filteredReports.map((report) => (
          <Card key={report.id} className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl flex items-center justify-between">
                <span className="flex items-center">
                  <Image
                    src={`/${report.platform}-logo-color.svg`}
                    alt={report.platform}
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  {report.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleReportExpansion(report.id)}
                >
                  {expandedReports.includes(report.id) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Date:</strong> {new Date(report.date).toLocaleString()}
              </p>
              <p>
                <strong>Platform:</strong> {report.platform}
              </p>
            </CardContent>
            {expandedReports.includes(report.id) && (
              <CardContent>
                <Timeline>
                  {report.results.map((result) => (
                    <div key={result.instance_ID} className="mb-8" id={`timeline-${report.id}-${result.instance_ID}`}>
                      <h3 className="text-lg font-semibold mb-2">
                        Instance {result.instance_ID}
                      </h3>
                      {result['context-before'].map((item, index) => (
                        <TimelineItem
                          key={`before-${result.instance_ID}-${index}`}
                          time={new Date(item.time * 1000).toLocaleString()}
                          author={item.author}
                          message={item.message}
                          type="context"
                        />
                      ))}
                      {result.flagged.map((item, index) => (
                        <TimelineItem
                          key={`flagged-${result.instance_ID}-${index}`}
                          time={new Date(item.time * 1000).toLocaleString()}
                          author={item.author}
                          message={item.message}
                          type="flagged"
                        />
                      ))}
                      {result['context-after'].map((item, index) => (
                        <TimelineItem
                          key={`after-${result.instance_ID}-${index}`}
                          time={new Date(item.time * 1000).toLocaleString()}
                          author={item.author}
                          message={item.message}
                          type="context"
                        />
                      ))}
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => printTimeline(report.id, result.instance_ID.toString())}
                        className="mt-4"
                      >
                        Print Timeline
                      </Button>
                    </div>
                  ))}
                </Timeline>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <p className="text-center text-gray-500 animate-fade-in">
          No reports found matching your search criteria.
        </p>
      )}
    </div>
  );
}