import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap/minimal-tiptap';
import FileUpload from '@/components/ui/file-upload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Send, ThumbsUp, MessageCircle, Share, Globe, Users, Lock, Clock, Calendar, Video, Image as ImageIcon, FileText, Hash, User, ChevronDown, Sparkles, Save } from 'lucide-react';

export default function Facebook() {
  const [caption, setCaption] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [postType, setPostType] = useState('post');
  const [audience, setAudience] = useState('public');
  const [charCount, setCharCount] = useState(0);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDateTime, setScheduledDateTime] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [suggestedHashtags, setSuggestedHashtags] = useState([]);

  // Mock user data
  const users = [
    { id: 'atif', name: 'Atif Ansari', username: '@atifansari', avatar: 'A' },
    { id: 'john', name: 'John Doe', username: '@johndoe', avatar: 'J' },
    { id: 'jane', name: 'Jane Smith', username: '@janesmith', avatar: 'JS' },
    { id: 'business', name: 'Business Page', username: '@mybusiness', avatar: 'B' }
  ];

  useEffect(() => {
    const textContent = caption.replace(/<[^>]*>/g, '');
    setCharCount(textContent.length);
  }, [caption]);

  // Generate suggested hashtags based on caption content
  const generateSuggestedHashtags = () => {
    const textContent = caption.replace(/<[^>]*>/g, '').toLowerCase();
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an', 'is', 'was', 'are', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'];
    
    const words = textContent.split(/\s+/).filter(word => 
      word.length > 3 && !commonWords.includes(word) && !word.match(/^\d+$/)
    );
    
    const uniqueWords = [...new Set(words)].slice(0, 8);
    const suggested = uniqueWords.map(word => `#${word}`);
    
    setSuggestedHashtags(suggested);
  };

  // Add hashtag to the hashtags field
  const addHashtag = (hashtag) => {
    if (!hashtags.includes(hashtag)) {
      setHashtags(prev => prev ? `${prev} ${hashtag}` : hashtag);
    }
  };

  // Handle media file upload
  const handleMediaUpload = async (files, { onProgress, onSuccess, onError }) => {
    for (const file of files) {
      try {
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 200));
          onProgress(file, progress);
        }
        onSuccess(file);
      } catch (error) {
        onError(file, error);
      }
    }
  };

  // Facebook Post Preview Component
  const FacebookPostPreview = () => (
    <div className="bg-white max-w-sm mx-auto border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <div>
              <div className="font-semibold text-sm">Atif Ansari</div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>2 hours ago</span>
                <Globe className="w-3 h-3" />
              </div>
            </div>
          </div>
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200">
            <span className="text-gray-500 text-sm">⋯</span>
          </div>
        </div>

        {/* Content */}
        {caption && (
          <div className="text-gray-800 mb-3 text-sm leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: caption }} />
          </div>
        )}

        {/* Media Container - Consistent aspect ratio for posts */}
        {mediaFiles.length > 0 && (
          <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden mb-3" style={{ aspectRatio: '4/3' }}>
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
        )}

        {/* Engagement Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pb-3 border-b">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <ThumbsUp className="w-2 h-2 text-white" />
              </div>
              <span>0</span>
            </div>
            <span>0 comments</span>
            <span>0 shares</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-around text-gray-500 text-sm">
          <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors">
            <ThumbsUp className="w-4 h-4" />
            <span>Like</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>Comment</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors">
            <Share className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Facebook Story Preview Component
  const FacebookStoryPreview = () => (
    <div className="bg-black max-w-sm mx-auto relative rounded-lg overflow-hidden" style={{ aspectRatio: '9/16', height: '600px' }}>
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
          <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
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
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center border-2 border-white">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <span className="text-white text-sm font-medium">Atif Ansari</span>
            <span className="text-white text-xs opacity-60">2h</span>
          </div>
          <div className="w-8 h-8 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <span className="text-white text-sm">⋯</span>
          </div>
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
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Send message" 
                className="w-full bg-white bg-opacity-20 backdrop-blur-sm text-white placeholder-white placeholder-opacity-60 rounded-full px-4 py-2 text-sm border border-white border-opacity-30"
              />
            </div>
            <button className="w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Facebook Reel Preview Component
  const FacebookReelPreview = () => (
    <div className="bg-black max-w-sm mx-auto relative rounded-lg overflow-hidden" style={{ aspectRatio: '9/16', height: '600px' }}>
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
          <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Video className="w-10 h-10" />
              </div>
              <p className="text-lg font-medium">Your Reel</p>
              <p className="text-sm opacity-80">Upload video content</p>
            </div>
          </div>
        )}
        
        {/* Reel Header */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <span className="text-white text-sm font-medium">Atif Ansari</span>
            <span className="text-white text-xs opacity-60">2h</span>
          </div>
          <div className="w-8 h-8 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <span className="text-white text-sm">⋯</span>
          </div>
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
        <div className="absolute right-2 bottom-32 flex flex-col items-center gap-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mb-1 cursor-pointer hover:bg-opacity-30">
              <ThumbsUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xs">0</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mb-1 cursor-pointer hover:bg-opacity-30">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xs">0</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mb-1 cursor-pointer hover:bg-opacity-30">
              <Share className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xs">Share</span>
          </div>
        </div>

        {/* Audio Info */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <div className="w-4 h-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
          </div>
          <span className="text-white text-xs">Original Audio</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Create Facebook Post</h1>
          <p className="text-sm text-gray-500">Share your content on Facebook</p>
        </div>
      </div>

      {/* Facebook Post Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div className="space-y-6">
          {/* User Selection */}
          <div className='space-y-6'>
            {/* User Selection */}
            <div className='space-y-2'>
              <Label htmlFor="user-select" className="block text-sm font-medium text-gray-700">Select User</Label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a user">
                    {selectedUser && (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {users.find(u => u.id === selectedUser)?.avatar}
                        </div>
                        <span>{users.find(u => u.id === selectedUser)?.name}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {user.avatar}
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.username}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
                <Label htmlFor="post-type" className="block text-sm font-medium text-gray-700">Post Type</Label>
                <Select value={postType} onValueChange={setPostType}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="post">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Feed Post</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="story">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      <span>Story</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="reel">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      <span>Reel</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor="caption" className="block text-sm font-medium text-gray-700">Caption</Label>
              <MinimalTiptapEditor
                value={caption}
                onChange={setCaption}
                className="w-full h-[200px] px-2"
                placeholder="What's on your mind?"
                editable={true}
                editorClassName="focus:outline-none"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">{charCount}/2000 characters</span>
              </div>
            </div>
            <div>
                  <div className="space-y-2">
                <Label htmlFor="hashtags">Hashtags</Label>
                <Textarea
                  id="hashtags"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  placeholder="#socialmedia #marketing #facebook"
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between my-2">
                  <Label>Suggested Hashtags</Label>
                  <Button
                    onClick={generateSuggestedHashtags}
                    variant="outline"
                    size="sm"
                    className="h-8"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    Generate
                  </Button>
                </div>
                {suggestedHashtags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {suggestedHashtags.map((hashtag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-blue-100 hover:text-blue-800"
                        onClick={() => addHashtag(hashtag)}
                      >
                        <Hash className="w-3 h-3 mr-1" />
                        {hashtag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='space-y-2'>
              <FileUpload
                value={mediaFiles}
                onValueChange={setMediaFiles}
                maxFiles={postType === 'story' ? 1 : postType === 'reel' ? 1 : 50}
                maxSize={100 * 1024 * 1024} // 100MB
                accept="image/jpeg,image/jpg,image/png,image/gif,video/mp4,video/mov,application/pdf"
                onUpload={handleMediaUpload}
              >
                <FileUpload.Dropzone className="mb-4">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600 mb-1">Drop your files here, or <span className="text-blue-600 cursor-pointer hover:underline">browse</span></p>
                    <p className="text-xs text-gray-500">Support JPG, PNG, MP4, PDF up to 100MB</p>
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
            </div>
            <div className='space-y-2'>
                <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Schedule Post</label>
                  <button
                    onClick={() => setIsScheduled(!isScheduled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isScheduled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isScheduled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                {isScheduled && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Schedule Date & Time</label>
                    <DateTimePicker
                      value={scheduledDateTime}
                      onChange={setScheduledDateTime}
                      className="w-full"
                    />
                  </div>
                )}
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    {isScheduled ? 'Schedule Now' : 'Publish Post Now'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
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
                {postType === 'post' && <FacebookPostPreview />}
                {postType === 'story' && <FacebookStoryPreview />}
                {postType === 'reel' && <FacebookReelPreview />}
              </div>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card>
            <CardHeader>
              <CardTitle>Facebook Tips</CardTitle>
              <CardDescription>Best practices for Facebook posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">📊 Visual content:</span> Posts with images get 2.3x more engagement
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">⏰ Optimal timing:</span> Post between 1-3 PM for maximum reach
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">💬 Engage quickly:</span> Respond to comments within the first hour
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">#️⃣ Use hashtags:</span> 1-2 relevant hashtags work best
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}