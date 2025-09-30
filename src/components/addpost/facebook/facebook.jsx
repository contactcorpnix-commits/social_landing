import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap/minimal-tiptap';
import FileUpload from '@/components/ui/file-upload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThumbsUp, MessageCircle, Share, Globe, Users, Lock, Clock, Calendar, Video, Image as ImageIcon, FileText } from 'lucide-react';

export default function Facebook() {
  const [caption, setCaption] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [postType, setPostType] = useState('post');
  const [audience, setAudience] = useState('public');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const textContent = caption.replace(/<[^>]*>/g, '');
    setCharCount(textContent.length);
  }, [caption]);

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
          {/* Account Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Account</CardTitle>
              <CardDescription>Choose which Facebook account to post from</CardDescription>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select Account"/>
                </SelectTrigger>
                <SelectContent className="SelectContent" position="popper" sideOffset={5} align="start" avoidCollisions={true}>
                  <SelectItem value="personal">Personal Account</SelectItem>
                  <SelectItem value="business">Business Page</SelectItem>
                  <SelectItem value="group">Group</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Post Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Post Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={postType} onValueChange={setPostType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Post type" />
                </SelectTrigger>
                <SelectContent className="SelectContent" position="popper" sideOffset={5} align="start" avoidCollisions={true}>
                  <SelectItem value="post">Feed Post</SelectItem>
                  <SelectItem value="story">Story</SelectItem>
                  <SelectItem value="reel">Reel</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Audience Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Audience</CardTitle>
              <CardDescription>Who can see your post?</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Audience" />
                </SelectTrigger>
                <SelectContent className="SelectContent" position="popper" sideOffset={5} align="start" avoidCollisions={true}>
                  <SelectItem value="public">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Public
                    </div>
                  </SelectItem>
                  <SelectItem value="friends">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Friends
                    </div>
                  </SelectItem>
                  <SelectItem value="onlyme">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Only Me
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Post Content */}
          <Card>
            <CardHeader>
              <CardTitle>What's on your mind?</CardTitle>
              <CardDescription className="sr-only">Write your Facebook post</CardDescription>
            </CardHeader>
            <CardContent>
              <MinimalTiptapEditor
                value={caption}
                onChange={setCaption}
                placeholder="What's on your mind?"
                className="w-full"
                editorContentClassName="p-3"
              />
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs text-gray-500">{charCount}/2000 characters</div>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  Add Feeling/Activity
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Add Media</CardTitle>
              <CardDescription className="sr-only">Upload photos, videos, or documents</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          {/* Publishing Options */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Schedule Post</label>
                  <div className="relative inline-flex items-center">
                    <input type="checkbox" className="sr-only" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                    Publish Now
                  </button>
                  <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
                    Save as Draft
                  </button>
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