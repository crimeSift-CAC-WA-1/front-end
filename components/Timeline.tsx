import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TimelineProps {
  children: ReactNode;
}

export function Timeline({ children }: TimelineProps) {
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      {children}
    </ol>
  );
}

interface TimelineItemProps {
  time: string;
  author: string;
  message: string;
  type: 'context' | 'flagged';
}

export function TimelineItem({
  time,
  author,
  message,
  type,
}: TimelineItemProps) {
  return (
    <li className="mb-6 md:mb-10 ml-4 md:ml-6">
      <span className="absolute flex items-center justify-center w-4 h-4 md:w-6 md:h-6 bg-blue-100 rounded-full -left-2 md:-left-3 ring-4 md:ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
        <svg
          className="w-2 h-2 md:w-2.5 md:h-2.5 text-blue-800 dark:text-blue-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
        </svg>
      </span>
      <div
        className={cn(
          'p-2 md:p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600',
          type === 'flagged' && 'border-red-500 dark:border-red-700'
        )}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 md:mb-3">
          <time className="mb-1 md:mb-0 text-xs font-normal text-gray-400 md:order-last">
            {time}
          </time>
          <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
            {author}
          </div>
        </div>
        <div className="p-2 md:p-3 text-xs md:text-sm italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
          {message}
        </div>
      </div>
    </li>
  );
}
