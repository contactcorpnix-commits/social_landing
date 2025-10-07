"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Filter, X, Edit3, Trash2, Eye, FileText, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample data for scheduled posts - October 2025
const samplePosts = [
  {
    id: 1,
    title: "Product Launch Announcement",
    content: "Excited to announce our new product line! 🚀",
    platform: "twitter",
    status: "scheduled",
    scheduledDate: new Date(2025, 9, 15, 14, 30), // October 15, 2025, 2:30 PM
    endDate: new Date(2025, 9, 15, 15, 30), // 1 hour duration
    type: "text",
    preview: "Excited to announce our new product line! 🚀"
  },
  {
    id: 2,
    title: "Holiday Sale Campaign",
    content: "🎃 Spooky October discounts available now!",
    platform: "facebook",
    status: "published",
    scheduledDate: new Date(2025, 9, 10, 9, 0), // October 10, 2025, 9:00 AM
    endDate: new Date(2025, 9, 10, 10, 30), // 1.5 hours duration
    type: "image",
    preview: "🎃 Spooky October discounts available now!"
  },
  {
    id: 3,
    title: "Behind the Scenes",
    content: "Take a look behind the scenes of our latest project...",
    platform: "instagram",
    status: "draft",
    scheduledDate: new Date(2025, 9, 20, 16, 15), // October 20, 2025, 4:15 PM
    endDate: new Date(2025, 9, 20, 17, 0), // 45 minutes duration
    type: "video",
    preview: "Take a look behind the scenes..."
  },
  {
    id: 4,
    title: "Industry Insights",
    content: "Key trends shaping our industry this year...",
    platform: "linkedin",
    status: "scheduled",
    scheduledDate: new Date(2025, 9, 18, 11, 45), // October 18, 2025, 11:45 AM
    endDate: new Date(2025, 9, 18, 12, 30), // 45 minutes duration
    type: "text",
    preview: "Key trends shaping our industry..."
  },
  {
    id: 5,
    title: "Customer Success Story",
    content: "Meet Sarah, who achieved amazing results with our service...",
    platform: "twitter",
    status: "scheduled",
    scheduledDate: new Date(2025, 9, 22, 13, 20), // October 22, 2025, 1:20 PM
    endDate: new Date(2025, 9, 22, 14, 0), // 40 minutes duration
    type: "image",
    preview: "Meet Sarah, who achieved amazing results..."
  },
  // 24-hour timeline demonstration posts for October 15, 2025
  {
    id: 9,
    title: "Early Morning Coffee Thoughts",
    content: "Starting the day with fresh ideas and strong coffee. The best conversations happen before the world wakes up.",
    preview: "Starting the day with fresh ideas and strong coffee...",
    platform: "twitter",
    status: "scheduled",
    type: "post",
    scheduledDate: new Date(2025, 9, 15, 6, 0), // 6:00 AM
    endDate: new Date(2025, 9, 15, 6, 30) // 30 minutes
  },
  {
    id: 10,
    title: "Morning Motivation",
    content: "Start your day with purpose and passion. Every morning is a fresh start to make your dreams come true.",
    preview: "Start your day with purpose and passion. Every morning is a fresh start to make your dreams come true.",
    platform: "twitter",
    status: "scheduled",
    type: "post",
    scheduledDate: new Date(2025, 9, 15, 8, 30), // 8:30 AM
    endDate: new Date(2025, 9, 15, 9, 0) // 30 minutes
  },
  {
    id: 11,
    title: "Team Standup Meeting",
    content: "Daily sync with the team. Aligning priorities and setting the tone for productive collaboration.",
    preview: "Daily sync with the team. Aligning priorities and setting the tone...",
    platform: "linkedin",
    status: "scheduled",
    type: "post",
    scheduledDate: new Date(2025, 9, 15, 9, 15), // 9:15 AM
    endDate: new Date(2025, 9, 15, 9, 45) // 30 minutes
  },
  {
    id: 12,
    title: "Client Presentation Prep",
    content: "Preparing for the big client presentation. Practice makes perfect, and attention to detail wins deals.",
    preview: "Preparing for the big client presentation. Practice makes perfect...",
    platform: "linkedin",
    status: "scheduled",
    type: "post",
    scheduledDate: new Date(2025, 9, 15, 10, 30), // 10:30 AM
    endDate: new Date(2025, 9, 15, 11, 30) // 1 hour
  },
  {
    id: 13,
    title: "Lunch Break Insights",
    content: "Taking a moment to reflect on productivity and work-life balance during lunch break.",
    preview: "Taking a moment to reflect on productivity and work-life balance during lunch break.",
    platform: "linkedin",
    status: "scheduled",
    type: "post",
    scheduledDate: new Date(2025, 9, 15, 12, 15), // 12:15 PM
    endDate: new Date(2025, 9, 15, 12, 45) // 30 minutes
  },
  {
    id: 14,
    title: "Afternoon Productivity Session",
    content: "Powering through the afternoon with focused work. The quiet hours after lunch are perfect for deep thinking.",
    preview: "Powering through the afternoon with focused work...",
    platform: "facebook",
    status: "scheduled",
    type: "post",
    scheduledDate: new Date(2025, 9, 15, 14, 0), // 2:00 PM
    endDate: new Date(2025, 9, 15, 16, 0) // 2 hours
  },
  {
    id: 15,
    title: "Client Call - Q4 Strategy",
    content: "Strategic planning session with key client. Mapping out the roadmap for mutual success in Q4.",
    preview: "Strategic planning session with key client...",
    platform: "twitter",
    status: "scheduled",
    type: "post",
    scheduledDate: new Date(2025, 9, 15, 15, 30), // 3:30 PM
    endDate: new Date(2025, 9, 15, 16, 30) // 1 hour
  },
  {
    id: 16,
    title: "Evening Wrap-up",
    content: "Wrapping up another productive day. Grateful for the progress made and lessons learned.",
    preview: "Wrapping up another productive day. Grateful for the progress made and lessons learned.",
    platform: "facebook",
    status: "scheduled",
    type: "post",
    scheduledDate: new Date(2025, 9, 15, 17, 45), // 5:45 PM
    endDate: new Date(2025, 9, 15, 18, 15) // 30 minutes
  },
  {
    id: 17,
    title: "Dinner Meeting",
    content: "Business dinner with potential partners. Great conversations happen over good food and wine.",
    preview: "Business dinner with potential partners...",
    platform: "instagram",
    status: "scheduled",
    type: "post",
    scheduledDate: new Date(2025, 9, 15, 19, 30), // 7:30 PM
    endDate: new Date(2025, 9, 15, 21, 30) // 2 hours
  },
  {
    id: 18,
    title: "Late Night Thoughts",
    content: "Sometimes the best ideas come when the world is quiet and you can hear your own thoughts.",
    preview: "Sometimes the best ideas come when the world is quiet and you can hear your own thoughts.",
    platform: "instagram",
    status: "scheduled",
    type: "post",
    scheduledDate: new Date(2025, 9, 15, 22, 0), // 10:00 PM
    endDate: new Date(2025, 9, 15, 22, 30) // 30 minutes
  }
];

const platformColors = {
  twitter: "bg-blue-500",
  facebook: "bg-blue-600",
  instagram: "bg-pink-500",
  linkedin: "bg-blue-700"
};

const statusColors = {
  scheduled: "bg-yellow-500",
  published: "bg-green-500",
  draft: "bg-gray-500",
  failed: "bg-red-500"
};

const statusLabels = {
  scheduled: "Scheduled",
  published: "Published",
  draft: "Draft",
  failed: "Failed"
};

const platformLabels = {
  twitter: "Twitter",
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn"
};

// Helper functions for Day View
const formatToAmPm = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  return `${displayHours}:${displayMinutes} ${ampm}`;
};

const generateTimelineHours = () => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    const ampm = i >= 12 ? 'PM' : 'AM';
    const displayHour = i % 12 || 12;
    hours.push({
      hour24: i,
      display: `${displayHour}:00 ${ampm}`,
      shortDisplay: `${displayHour}${ampm.toLowerCase()}`
    });
  }
  return hours;
};

const getPostsForHour = (date, hour) => {
  return samplePosts.filter(post => {
    const postDate = post.scheduledDate;
    return postDate.toDateString() === date.toDateString() && 
           postDate.getHours() === hour;
  });
};

const getPostDurationHeight = (post) => {
  if (!post.endDate) return 40; // Default height if no end date
  const duration = (post.endDate - post.scheduledDate) / (1000 * 60); // duration in minutes
  return Math.max(30, (duration / 60) * 60); // minimum 30px, 60px per hour
};

// Day View Component with 24-hour timeline
const DayView = ({ date, posts, onBack }) => {
  const timelineHours = generateTimelineHours();
  const sortedPosts = posts.sort((a, b) => a.scheduledDate - b.scheduledDate);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <ChevronLeft className="h-4 w-4 flex-shrink-0" />
            <span className="hidden sm:inline">Back to Calendar</span>
            <span className="sm:hidden">Back</span>
          </Button>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {date.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">24-Hour Timeline</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-gray-500">
            {posts.length} scheduled {posts.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {/* 24-Hour Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <ScrollArea className="h-[400px] sm:h-[500px] md:h-[600px]">
          <div className="relative">
            {timelineHours.map((hourData, index) => {
              const hourPosts = getPostsForHour(date, hourData.hour24);
              
              return (
                <div key={hourData.hour24} className="flex border-b border-gray-100">
                  {/* Hour Label */}
                  <div className="w-12 xs:w-14 sm:w-16 md:w-20 py-2 xs:py-3 sm:py-4 px-1 xs:px-2 sm:px-3 text-right border-r border-gray-200 bg-gray-50 flex-shrink-0">
                    <div className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-700">
                      <span className="hidden sm:inline">{hourData.display}</span>
                      <span className="sm:hidden">{hourData.shortDisplay}</span>
                    </div>
                  </div>
                  
                  {/* Timeline Content */}
                  <div className="flex-1 relative min-h-[50px] xs:min-h-[60px] sm:min-h-[80px] py-1 xs:py-2 px-1 xs:px-2 sm:px-3">
                    {hourPosts.map((post, postIndex) => {
                      const postHeight = getPostDurationHeight(post);
                      const minutesOffset = (post.scheduledDate.getMinutes() / 60) * 60; // offset in pixels
                      
                      return (
                        <div
                          key={post.id}
                          className={`absolute left-1 xs:left-2 right-1 xs:right-2 sm:left-3 sm:right-3 rounded-lg border p-1 xs:p-2 sm:p-3 cursor-pointer transition-all hover:shadow-md ${
                            post.status === 'published' ? 'bg-green-50 border-green-200' :
                            post.status === 'scheduled' ? 'bg-blue-50 border-blue-200' :
                            'bg-yellow-50 border-yellow-200'
                          }`}
                          style={{
                            top: `${minutesOffset}px`,
                            height: `${postHeight}px`,
                            zIndex: 10 + postIndex
                          }}
                          onClick={() => setSelectedPost(post)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-1 mb-1">
                                <div 
                                  className="w-2 h-2 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: platformColors[post.platform] }}
                                />
                                <span className="text-[10px] xs:text-xs font-medium text-gray-600">
                                  {platformLabels[post.platform]}
                                </span>
                                <span className="text-[10px] xs:text-xs text-gray-500">
                                  {formatToAmPm(post.scheduledDate)}
                                </span>
                                {post.endDate && (
                                  <span className="text-[10px] xs:text-xs text-gray-500">
                                    - {formatToAmPm(post.endDate)}
                                  </span>
                                )}
                              </div>
                              <h4 className="text-[10px] xs:text-xs sm:text-sm font-semibold text-gray-900 truncate">
                                {post.title}
                              </h4>
                              <p className="text-[10px] xs:text-xs text-gray-600 mt-1 line-clamp-1">
                                {post.preview}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1 ml-1 flex-shrink-0">
                              <span className={`px-1 py-0.5 rounded-full text-[10px] xs:text-xs font-medium ${
                                post.status === 'published' ? 'bg-green-100 text-green-800' :
                                post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {statusLabels[post.status]}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Empty slot indicator */}
                    {hourPosts.length === 0 && (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-gray-400 text-xs">Available</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Scheduled</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Published</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span>Draft</span>
        </div>
      </div>
    </div>
  );
};

// Timeline View Component (kept for backward compatibility)
function TimelineView({ date, posts, onPostClick }) {
  const getPostsForDate = (date) => {
    if (!date) return [];
    return posts.filter(post => {
      const postDate = new Date(post.scheduledDate);
      return postDate.toDateString() === date.toDateString();
    }).sort((a, b) => a.scheduledDate - b.scheduledDate); // Sort chronologically
  };

  const dayPosts = getPostsForDate(date);
  const formattedDate = date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  if (dayPosts.length === 0) {
    return (
      <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-sm">
        <CardContent className="p-8 text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">No posts scheduled for this date</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{formattedDate}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 sm:gap-3">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">{formattedDate}</span>
          <Badge variant="secondary" className="ml-auto text-xs sm:text-sm">
            {dayPosts.length} {dayPosts.length === 1 ? 'post' : 'posts'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-purple-200 dark:from-blue-700/50 dark:to-purple-700/50"></div>
          
          {/* Timeline items */}
          <div className="space-y-6">
            {dayPosts.map((post, index) => (
              <div key={post.id} className="relative flex items-start gap-2 sm:gap-4 group">
                {/* Timeline dot */}
                <div className={`relative z-10 w-3 h-3 sm:w-4 sm:h-4 rounded-full ${platformColors[post.platform]} ring-2 sm:ring-4 ring-white dark:ring-gray-800 mt-1 flex-shrink-0`}></div>
                
                {/* Time */}
                <div className="flex-shrink-0 w-12 sm:w-16 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                  {post.scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                
                {/* Post card */}
                <Card 
                  className={`flex-1 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] ${
                    post.status === 'published' ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/20 border-green-200' :
                    post.status === 'scheduled' ? 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/20 border-blue-200' :
                    'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/20 border-yellow-200'
                  } border-2 rounded-lg`}
                  onClick={() => onPostClick(post)}
                >
                  <CardContent className="p-2 sm:p-4">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${platformColors[post.platform]}`} />
                        <span className="font-semibold text-xs sm:text-sm">{platformLabels[post.platform]}</span>
                      </div>
                      <Badge className={`${statusColors[post.status]} text-white text-[10px] sm:text-xs`}>
                        {statusLabels[post.status]}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">{post.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2 sm:mb-3">{post.preview}</p>
                    <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-500">
                      <Clock className="w-2 h-2 sm:w-3 sm:h-3" />
                      <span>{post.scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline capitalize">{post.type}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPost, setSelectedPost] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState('calendar'); // 'calendar', 'timeline', 'day', 'week', 'month'
  const [hoveredDate, setHoveredDate] = useState(null);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getPostsForDate = (date) => {
    if (!date) return [];
    return samplePosts.filter(post => {
      const postDate = new Date(post.scheduledDate);
      return postDate.toDateString() === date.toDateString();
    });
  };

  // Helper functions moved before DayView component

  const getPostsForWeek = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return samplePosts.filter(post => {
      const postDate = new Date(post.scheduledDate);
      return postDate >= startOfWeek && postDate <= endOfWeek;
    });
  };

  const filteredPosts = samplePosts.filter(post => {
    const statusMatch = filterStatus === 'all' || post.status === filterStatus;
    const platformMatch = filterPlatform === 'all' || post.platform === filterPlatform;
    return statusMatch && platformMatch;
  });

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleDragStart = (post) => {
    // Handle drag start
    console.log('Dragging post:', post);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (date) => {
    console.log('Dropped on date:', date);
    // Handle drop logic here
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleBackToCalendar = () => {
    setSelectedDate(null);
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-0 shadow-sm bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
        <CardHeader>
          <div className=" flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 text-white rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </div>
                <div>
                  <CardTitle className="text-md sm:text-1xl lg:text-2xl font-bold">
                    {selectedDate ? 'Daily Timeline' : 'Schedule Calendar'}
                  </CardTitle>
                </div>
              
              </div>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Badge variant="outline" className="text-xs sm:text-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  {filteredPosts.length} posts scheduled
                </Badge>
                
                {/* View navigation controls */}
                {!selectedDate && (
                  <div className="flex items-center gap-1 sm:gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-1">
                    <Button
                      variant={view === 'month' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setView('month')}
                      className="px-2 sm:px-3 text-xs sm:text-sm"
                    >
                      Month
                    </Button>
                    <Button
                      variant={view === 'week' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setView('week')}
                      className="px-2 sm:px-3 text-xs sm:text-sm"
                    >
                      Week
                    </Button>
                    <Button
                      variant={view === 'day' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setView('day')}
                      className="px-2 sm:px-3 text-xs sm:text-sm"
                    >
                      Day
                    </Button>
                  </div>
                )}

                {/* Back button when in timeline view */}
                {selectedDate && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBackToCalendar}
                    className="flex items-center gap-2 text-xs sm:text-sm"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    Back to Calendar
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToToday}
                  className="text-xs sm:text-sm"
                >
                  Today
                </Button>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <div className="flex flex-1 items-center gap-1 sm:gap-2 py-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigateMonth(-1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 "
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  
                  <div className="text-sm sm:text-lg font-semibold min-w-[120px] sm:min-w-[150px] text-center">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigateMonth(1)}
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  >
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              {!selectedDate && (
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 text-xs sm:text-sm"
                >
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
                  Filters
                </Button>
                
                
              </div>
            )}
            </div>
            
                
          </div>
          
          {/* Filters - only show in calendar view */}
          {!selectedDate && showFilters && (
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-3 sm:pt-4 border-t">
              <div className="flex items-center gap-2">
                <label className="text-xs sm:text-sm font-medium">Status:</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-2 sm:px-3 py-1 border rounded-md text-xs sm:text-sm"
                >
                  <option value="all">All</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-xs sm:text-sm font-medium">Platform:</label>
                <select
                  value={filterPlatform}
                  onChange={(e) => setFilterPlatform(e.target.value)}
                  className="px-2 sm:px-3 py-1 border rounded-md text-xs sm:text-sm"
                >
                  <option value="all">All Platforms</option>
                  <option value="twitter">Twitter</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Conditionally render different views */}
      {selectedDate ? (
        <DayView 
          date={selectedDate} 
          posts={getPostsForDate(selectedDate)} 
          onBack={handleBackToCalendar}
        />
      ) : view === 'day' ? (
        <DayView 
          date={currentDate} 
          posts={getPostsForDate(currentDate)} 
          onBack={() => setView('month')}
        />
      ) : (
        <>
          {/* Calendar Grid */}
          <Card className="border-0 shadow-sm bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Calendar View</CardTitle>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">Scheduled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">Published</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">Draft</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-7 gap-px bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                {dayNames.map(day => (
                  <div key={day} className="bg-white/80 dark:bg-gray-800/80 p-1 sm:p-2 md:p-3 lg:p-4 text-center text-[10px] sm:text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 backdrop-blur-sm">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7">
                {days.map((date, index) => (
                  <div
                    key={index}
                    className={`
                      min-h-[60px] xs:min-h-[80px] sm:min-h-[100px] md:min-h-[120px] lg:min-h-[140px] p-1 sm:p-2 md:p-3 border-r border-b last:border-r-0 transition-all duration-200 relative group
                      ${date ? 'hover:bg-accent/50 cursor-pointer' : ''}
                      ${date && date.toDateString() === new Date().toDateString() ? 'bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-900/30 dark:to-purple-900/30 ring-2 ring-blue-400 dark:ring-blue-500' : ''}
                    `}
                    onDrop={() => date && handleDrop(date)}
                    onDragOver={handleDragOver}
                    onClick={() => date && handleDateClick(date)}
                    onMouseEnter={() => date && setHoveredDate(date)}
                    onMouseLeave={() => setHoveredDate(null)}
                  >
                    {date && (
                      <>
                        <div className="text-[10px] xs:text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                          {date.getDate()}
                        </div>
                        
                        <div className="space-y-1">
                          {getPostsForDate(date).slice(0, 2).map(post => (
                            <Card
                              key={post.id}
                              className={`p-1 sm:p-2 md:p-3 mb-1 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                                post.status === 'published' ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/20 border-green-200' :
                                post.status === 'scheduled' ? 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/20 border-blue-200' :
                                'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/20 border-yellow-200'
                              } border-2 rounded-lg`}
                              draggable
                              onDragStart={() => handleDragStart(post)}
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePostClick(post);
                              }}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1">
                                  <div className={`w-2 h-2 rounded-full ${platformColors[post.platform]}`} />
                                  <span className="text-[10px] xs:text-xs font-semibold text-gray-700 dark:text-gray-300">{post.platform}</span>
                                </div>
                                <Badge variant="outline" className="text-[10px] xs:text-xs px-1 py-0.5">
                                  {post.status}
                                </Badge>
                              </div>
                              <div className="text-[10px] xs:text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-1 line-clamp-1 sm:line-clamp-2">
                                {post.preview}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-2 h-2 text-gray-500" />
                                <span className="text-[10px] xs:text-xs text-gray-500 dark:text-gray-400">
                                  {post.scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </Card>
                          ))}
                          
                          {getPostsForDate(date).length > 2 && (
                            <div className="text-xs text-muted-foreground text-center">
                              +{getPostsForDate(date).length - 2} more
                            </div>
                          )}
                        </div>
                        
                        {/* Create New Post button on hover */}
                        {hoveredDate && hoveredDate.toDateString() === date.toDateString() && getPostsForDate(date).length === 0 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Create new post for', date.toDateString());
                                // Add your post creation logic here
                              }}
                              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                            >
                              Create New Post
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Summary Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Posts</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{filteredPosts.length}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Scheduled</p>
                    <p className="text-lg sm:text-2xl font-bold text-blue-600">{filteredPosts.filter(p => p.status === 'scheduled').length}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Published</p>
                    <p className="text-lg sm:text-2xl font-bold text-green-600">{filteredPosts.filter(p => p.status === 'published').length}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">This Week</p>
                    <p className="text-lg sm:text-2xl font-bold text-purple-600">{getPostsForWeek().length}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Post Details Dialog */}
      {selectedPost && (
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-base sm:text-lg">Post Details</DialogTitle>
            </DialogHeader>
            
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${platformColors[selectedPost.platform]}`} />
                  <span className="font-semibold text-sm sm:text-base">{platformLabels[selectedPost.platform]}</span>
                  <Badge className={`${statusColors[selectedPost.status]} text-white text-xs sm:text-sm`}>
                    {statusLabels[selectedPost.status]}
                  </Badge>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Title</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{selectedPost.title}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Content</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{selectedPost.content}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Scheduled Date</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {selectedPost.scheduledDate.toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Scheduled Time</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {selectedPost.scheduledDate.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Type</h3>
                  <p className="capitalize text-muted-foreground text-xs sm:text-sm">{selectedPost.type}</p>
                </div>
              </div>
            </ScrollArea>
            
            <div className="flex justify-end gap-2 pt-3 sm:pt-4 border-t">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 text-xs sm:text-sm">
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}