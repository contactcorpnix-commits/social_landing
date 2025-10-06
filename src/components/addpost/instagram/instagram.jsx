import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap';
import { FileUpload } from '@/components/ui/file-upload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, MessageCircle, Send, Bookmark, EllipsisVertical, Music, Play, Repeat2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { DateTimePicker } from '@/components/ui/datetime-picker';



export default function InstagramPost() {
  const [caption, setCaption] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [postType, setPostType] = useState('feed');
  const [charCount, setCharCount] = useState(0);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDateTime, setScheduledDateTime] = useState(null);
  const [scheduleConfirmed, setScheduleConfirmed] = useState(false);

  useEffect(() => {
    const textContent = caption.replace(/<[^>]*>/g, '');
    setCharCount(textContent.length);
  }, [caption]);

  const handleMediaUpload = async (files) => {
    console.log('Uploading files:', files);
    // Handle file upload logic here
  };

  const handleScheduleToggle = (checked) => {
    setIsScheduled(checked);
    if (!checked) {
      setScheduledDateTime(null);
      setScheduleConfirmed(false);
    }
  };

  const handleDateTimeChange = (dateTime) => {
    setScheduledDateTime(dateTime);
    setScheduleConfirmed(false);
  };

  const handlePublishNow = () => {
    if (isScheduled && scheduledDateTime) {
      const now = new Date();
      if (scheduledDateTime <= now) {
        alert('Please select a future date and time for scheduling.');
        return;
      }
      setScheduleConfirmed(true);
      console.log('Publishing scheduled for:', scheduledDateTime);
    } else {
      console.log('Publishing now...');
    }
  };

  const formatScheduledTime = (date) => {
    if (!date) return '';
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Feed Post Preview Component
  const FeedPostPreview = () => (
    <div className="bg-white max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 pb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <div>
            <div className="font-semibold text-sm">atifansari</div>
            <div className="text-xs text-gray-500">Original audio</div>
          </div>
        </div>
        <EllipsisVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
      </div>

      {/* Media Container - Consistent 4:5 ratio for Feed Posts */}
      <div className="relative w-full bg-gray-100" style={{ aspectRatio: '4/5' }}>
        {mediaFiles.length > 0 ? (
          <div className="w-full h-full">
            {mediaFiles[0].type.startsWith('image/') ? (
              <img 
                src={URL.createObjectURL(mediaFiles[0])} 
                alt="Post media" 
                className="w-full h-full object-cover"
              />
            ) : (
              <video 
                src={URL.createObjectURL(mediaFiles[0])} 
                className="w-full h-full object-cover" 
                controls 
                muted
              />
            )}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">Upload your media</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <Heart className="w-6 h-6 text-gray-700 cursor-pointer hover:text-red-500" />
            <MessageCircle className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900" />
            <Send className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900" />
          </div>
          <Bookmark className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900" />
        </div>
        
        <div className="text-sm font-semibold mb-2">0 likes</div>
        
        {caption && (
          <div className="text-sm">
            <span className="font-semibold">atifansari </span>
            <span dangerouslySetInnerHTML={{ __html: caption }} />
          </div>
        )}
        
        <div className="text-xs text-gray-500 mt-2">2 hours ago</div>
      </div>
    </div>
  );

  // Story Preview Component
  const StoryPreview = () => (
    <div className="bg-black max-w-sm mx-auto relative" style={{ aspectRatio: '9/16', height: '600px' }}>
      {/* Story Container - Consistent 9:16 ratio */}
      <div className="w-full h-full relative">
        {mediaFiles.length > 0 ? (
          <div className="w-full h-full">
            {mediaFiles[0].type.startsWith('image/') ? (
              <img 
                src={URL.createObjectURL(mediaFiles[0])} 
                alt="Story" 
                className="w-full h-full object-cover"
              />
            ) : (
              <video 
                src={URL.createObjectURL(mediaFiles[0])} 
                className="w-full h-full object-cover" 
                controls 
                muted
                autoPlay
                loop
              />
            )}
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-lg font-medium">Your Story</p>
              <p className="text-sm opacity-80">Upload image or video</p>
            </div>
          </div>
        )}
        
        {/* Story Header */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <span className="text-white text-sm font-medium">atifansari</span>
            <span className="text-white text-xs opacity-60">2h</span>
          </div>
          <EllipsisVertical className="w-5 h-5 text-white cursor-pointer" />
        </div>

        {/* Story Caption */}
        {caption && (
          <div className="absolute bottom-20 left-4 right-4">
            <div className="bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-white text-sm" dangerouslySetInnerHTML={{ __html: caption }} />
            </div>
          </div>
        )}

        {/* Story Controls */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Send message" 
                className="w-full bg-white bg-opacity-20 backdrop-blur-sm text-white placeholder-white placeholder-opacity-60 rounded-full px-4 py-2 text-sm border border-white border-opacity-30"
              />
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-white cursor-pointer hover:text-red-400" />
              <Send className="w-5 h-5 text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Reel Preview Component
  const ReelPreview = () => (
    <div className="bg-black max-w-sm mx-auto relative" style={{ aspectRatio: '9/16', height: '600px' }}>
      {/* Reel Container - Consistent 9:16 ratio */}
      <div className="w-full h-full relative">
        {mediaFiles.length > 0 ? (
          <div className="w-full h-full">
            {mediaFiles[0].type.startsWith('image/') ? (
              <img 
                src={URL.createObjectURL(mediaFiles[0])} 
                alt="Reel" 
                className="w-full h-full object-cover"
              />
            ) : (
              <video 
                src={URL.createObjectURL(mediaFiles[0])} 
                className="w-full h-full object-cover" 
                controls 
                muted
                autoPlay
                loop
              />
            )}
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Play className="w-10 h-10" />
              </div>
              <p className="text-lg font-medium">Your Reel</p>
              <p className="text-sm opacity-80">Upload video content</p>
            </div>
          </div>
        )}
        
        {/* Reel Header */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <span className="text-white text-sm font-medium">atifansari</span>
            <span className="text-white text-xs opacity-60">2h</span>
          </div>
          <EllipsisVertical className="w-5 h-5 text-white cursor-pointer" />
        </div>

        {/* Reel Caption */}
        {caption && (
          <div className="absolute bottom-32 left-4 right-16">
            <div className="bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-white text-sm" dangerouslySetInnerHTML={{ __html: caption }} />
            </div>
          </div>
        )}

        {/* Reel Actions */}
        <div className="absolute right-2 bottom-12 flex flex-col items-center gap-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mb-1 cursor-pointer hover:bg-opacity-30">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xs">0</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mb-1 cursor-pointer hover:bg-opacity-30">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xs">0</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mb-1 cursor-pointer hover:bg-opacity-30">
              <Repeat2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xs">Reshare</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mb-1 cursor-pointer hover:bg-opacity-30">
              <Send className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xs">Share</span>
          </div>

          
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30">
              <EllipsisVertical className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        {/* Audio Info */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <Music className="w-4 h-4 text-white" />
          <span className="text-white text-xs">Original Audio</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Instagram Post Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div className="space-y-6">
          {/* Account Selection */}
          <Card>
            <CardContent className="flex gap-4">
              <div>
                <CardTitle className="text-sm font-medium py-2">Account Type</CardTitle>
                <Select className="w-full overflow-hidden">
                    <SelectTrigger className="px-3 py-2 w-[180px]">
                    <SelectValue placeholder="Select Post Type"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Personal Account">Personal Account</SelectItem>
                    <SelectItem value="Business Account">Business Account</SelectItem>
                    <SelectItem value="Creator Account">Creator Account</SelectItem>
                </SelectContent>
                </Select>
              </div>
              <div>
                <CardTitle className="text-sm font-medium py-2">Post Type</CardTitle>
                <Select value={postType} onValueChange={setPostType}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Post type" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="feed">Feed Post</SelectItem>
                <SelectItem value="story">Story</SelectItem>
                <SelectItem value="reel">Reel</SelectItem>
                </SelectContent>
              </Select>
              </div>
              
            </CardContent>
          </Card>
          {/* Caption */}
          <Card>
            <CardTitle className="text-sm font-medium px-5">Caption</CardTitle>
            <CardContent>
              <MinimalTiptapEditor
                value={caption}
                onChange={setCaption}
                placeholder="Write a caption..."
                className="w-full"
                editorContentClassName="p-3"
              />
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs text-gray-500">{charCount}/2200 characters</div>
                <Button className="text-xs font-medium mt-2">
                  Generate AI Hashtags
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Add Media</CardTitle>
              <CardDescription className="sr-only">Upload photos or videos</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                value={mediaFiles}
                onValueChange={setMediaFiles}
                maxFiles={10}
                maxSize={100 * 1024 * 1024} // 100MB
                accept="image/jpeg,image/jpg,image/png,image/gif,video/mp4,video/mov"
                onUpload={handleMediaUpload}
              >
                <FileUpload.Dropzone className="mb-4">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600 mb-1">Drop your media here, or <span className="text-pink-600 cursor-pointer hover:underline">browse</span></p>
                    <p className="text-xs text-gray-500">Support JPG, PNG, MP4 up to 100MB</p>
                  </div>
                </FileUpload.Dropzone>

                <FileUpload.List>
                  <FileUpload.Item className="group">
                    <FileUpload.ItemPreview />
                    <FileUpload.ItemMetadata />
                    <FileUpload.ItemProgress />
                    <FileUpload.ItemDelete />
                  </FileUpload.Item>
                </FileUpload.List>

                {mediaFiles.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {mediaFiles.length} media file(s) selected
                    </span>
                    <FileUpload.Clear />
                  </div>
                )}
              </FileUpload>
            </CardContent>
          </Card>

          {/* Publishing Options */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium text-gray-700">Schedule Post</Label>
                  <Switch 
                    id="schedule-post" 
                    checked={isScheduled}
                    onCheckedChange={handleScheduleToggle}
                  />
                </div>
                
                {isScheduled && (
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg border">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Select Date & Time
                      </Label>
                      <DateTimePicker
                        value={scheduledDateTime}
                        onChange={handleDateTimeChange}
                        placeholder="Choose date and time"
                      />
                    </div>
                    
                    {scheduledDateTime && (
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">Scheduled for:</p>
                        <p className="text-blue-600 font-medium">
                          {formatScheduledTime(scheduledDateTime)}
                        </p>
                      </div>
                    )}
                    
                    {scheduleConfirmed && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-800">
                        ✓ Your post has been scheduled successfully!
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 text-sm font-medium"
                    onClick={handlePublishNow}
                  >
                    {isScheduled ? 'Schedule Post' : 'Publish Now'}
                  </Button>
                  <Button className="flex-1 text-sm font-medium" variant="outline">
                    Save as Draft
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Preview */}
        <div className="space-y-6">
          {/* Preview Card */}
          <Card>
            <CardHeader>
              <CardTitle>Post Preview</CardTitle>
              <CardDescription>See how your post will look</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden">
                {/* Dynamic Preview based on post type */}
                {postType === 'feed' && <FeedPostPreview />}
                {postType === 'story' && <StoryPreview />}
                {postType === 'reel' && <ReelPreview />}
              </div>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card>
            <CardHeader>
              <CardTitle>Instagram Tips</CardTitle>
              <CardDescription>Best practices for Instagram posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">📸 High-quality visuals:</span> Use clear, well-lit photos for better engagement
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">#️⃣ Strategic hashtags:</span> Use 5-10 relevant hashtags per post
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">🕒 Post timing:</span> Best times are 11 AM - 1 PM and 7-9 PM
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">📏 Consistent dimensions:</span> Feed posts (4:5), Stories/Reels (9:16)
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}