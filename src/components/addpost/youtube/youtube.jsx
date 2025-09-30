import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap/minimal-tiptap';
import FileUpload from '@/components/ui/file-upload';

export default function YouTube() {
  const [postType, setPostType] = useState('video');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoFiles, setVideoFiles] = useState([]);
  const [thumbnailFiles, setThumbnailFiles] = useState([]);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoTags, setVideoTags] = useState('');

  // Function to count text content from HTML
  const getTextContent = (html) => {
    if (!html) return 0;
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent.length || div.innerText.length || 0;
  };

  // Handle video file upload
  const handleVideoUpload = async (files, { onProgress, onSuccess, onError }) => {
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

  // Handle thumbnail upload
  const handleThumbnailUpload = async (files, { onProgress, onSuccess, onError }) => {
    for (const file of files) {
      try {
        // Simulate upload progress (faster for images)
        for (let progress = 0; progress <= 100; progress += 20) {
          await new Promise(resolve => setTimeout(resolve, 100));
          onProgress(file, progress);
        }
        onSuccess(file);
      } catch (error) {
        onError(file, error);
      }
    }
  };

  const charCount = getTextContent(videoDescription);

  // Preview components for different post types
  const VideoPreview = () => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-black aspect-video flex items-center justify-center">
        {videoFiles.length > 0 ? (
          <div className="text-white text-center">
            <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <p className="text-sm">{videoFiles[0].name}</p>
          </div>
        ) : (
          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </div>
      
      <div className="bg-white p-4">
        <h3 className="font-medium text-gray-900 mb-2">{videoTitle || 'Your Video Title'}</h3>
        <div className="text-sm text-gray-600 mb-3">1K views • 1 minute ago</div>
        
        <div className="text-sm text-gray-700 mb-3 line-clamp-3">
          {videoDescription ? (
            <div dangerouslySetInnerHTML={{ __html: videoDescription }} />
          ) : (
            <p className="text-gray-400">Your video description will appear here...</p>
          )}
        </div>
        
        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div>
              <div className="font-medium text-sm">Your Channel</div>
              <div className="text-xs text-gray-500">1K subscribers</div>
            </div>
          </div>
          <button className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );

  const ShortPreview = () => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-black aspect-[9/16] max-w-sm mx-auto flex items-center justify-center">
        {videoFiles.length > 0 ? (
          <div className="text-white text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <p className="text-xs">{videoFiles[0].name}</p>
          </div>
        ) : (
          <div className="text-white text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <p className="text-xs">YouTube Short</p>
          </div>
        )}
      </div>
      
      <div className="bg-white p-3">
        <h3 className="font-medium text-gray-900 text-sm mb-1">{videoTitle || 'Your Short Title'}</h3>
        <div className="text-xs text-gray-600 mb-2">1K views</div>
        
        <div className="text-xs text-gray-700 line-clamp-2">
          {videoDescription ? (
            <div dangerouslySetInnerHTML={{ __html: videoDescription }} />
          ) : (
            <p className="text-gray-400">Your short description...</p>
          )}
        </div>
      </div>
    </div>
  );

  const LivePreview = () => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-red-600 aspect-video flex items-center justify-center relative">
        <div className="absolute top-3 left-3 bg-red-700 text-white px-2 py-1 rounded text-xs font-bold">
          LIVE
        </div>
        <div className="text-white text-center">
          <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
          </svg>
          <p className="text-sm font-medium">Live Stream Preview</p>
        </div>
      </div>
      
      <div className="bg-white p-4">
        <h3 className="font-medium text-gray-900 mb-2">{videoTitle || 'Your Live Stream'}</h3>
        <div className="text-sm text-red-600 font-medium mb-3">🔴 LIVE</div>
        
        <div className="text-sm text-gray-700 mb-3">
          {videoDescription ? (
            <div dangerouslySetInnerHTML={{ __html: videoDescription }} />
          ) : (
            <p className="text-gray-400">Your live stream description...</p>
          )}
        </div>
        
        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div>
              <div className="font-medium text-sm">Your Channel</div>
              <div className="text-xs text-gray-500">Live viewers: 0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreview = () => {
    switch (postType) {
      case 'short':
        return <ShortPreview />;
      case 'live':
        return <LivePreview />;
      case 'video':
      default:
        return <VideoPreview />;
    }
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Create YouTube Video</h1>
          <p className="text-sm text-gray-500">Upload and manage your YouTube content</p>
        </div>
      </div>

      {/* YouTube Video Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div className="space-y-6">
          {/* Post Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Content Type</CardTitle>
              <CardDescription>Choose the type of content you want to create</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={postType} onValueChange={setPostType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Regular Video</SelectItem>
                  <SelectItem value="short">YouTube Short</SelectItem>
                  <SelectItem value="live">Live Stream</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Content Upload */}
          <Card>
            <CardHeader>
              <CardTitle>
                {postType === 'short' ? 'Upload Short' : postType === 'live' ? 'Stream Setup' : 'Upload Video'}
              </CardTitle>
              <CardDescription>
                {postType === 'short' ? 'Choose your short video to upload (60 seconds max)' : 
                 postType === 'live' ? 'Configure your live stream settings' : 
                 'Choose your video file to upload'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {postType === 'live' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stream Title</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="Enter your stream title"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stream Key</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-50"
                        value="live_123456789_abcdef123456789"
                        readOnly
                      />
                      <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm">
                        Copy
                      </button>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Setup Instructions:</strong> Use the stream key above in your streaming software (OBS, Streamlabs, etc.)
                    </p>
                  </div>
                </div>
              ) : (
                <FileUpload
                  value={videoFiles}
                  onValueChange={setVideoFiles}
                  maxFiles={1}
                  maxSize={128 * 1024 * 1024} // 128GB
                  accept={postType === 'short' ? "video/mp4,video/mov" : "video/mp4,video/mov,video/avi,video/wmv"}
                  onUpload={handleVideoUpload}
                >
                  <FileUpload.Dropzone className="mb-4">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p className="text-lg text-gray-600 mb-2">
                        Drop your {postType === 'short' ? 'short' : 'video'} here, or <span className="text-red-600 cursor-pointer hover:underline font-medium">browse</span>
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        Support {postType === 'short' ? 'MP4, MOV up to 60 seconds' : 'MP4, MOV, AVI up to 128GB'}
                      </p>
                      <p className="text-xs text-gray-400">
                        {postType === 'short' ? 'Recommended: 9:16 aspect ratio, 60 seconds max' : 'Recommended: 1080p, 16:9 aspect ratio'}
                      </p>
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

                  {videoFiles.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {videoFiles.length} {postType === 'short' ? 'short' : 'video'}(s) selected
                      </span>
                      <FileUpload.Clear />
                    </div>
                  )}
                </FileUpload>
              )}
            </CardContent>
          </Card>

          {/* Content Details */}
          <Card>
            <CardHeader>
              <CardTitle>
                {postType === 'short' ? 'Short Details' : postType === 'live' ? 'Stream Details' : 'Video Details'}
              </CardTitle>
              <CardDescription>
                {postType === 'short' ? 'Optimize your short for discovery' : 
                 postType === 'live' ? 'Configure your stream settings' : 
                 'Optimize your video for discovery'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {postType === 'live' ? 'Stream Title' : 'Title'}
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder={postType === 'short' ? 'Enter a catchy short title' : 'Enter a compelling title'}
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
                <div className="text-xs text-gray-500 mt-1">{videoTitle.length}/100 characters</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {postType === 'live' ? 'Stream Description' : 'Description'}
                </label>
                <MinimalTiptapEditor
                value={videoDescription}
                onChange={setVideoDescription}
                placeholder={postType === 'short' ? 'Tell viewers about your short' : 'Tell viewers about your video'}
                className="w-full"
                editorContentClassName="p-3"
              />
              <div className="text-xs text-gray-500 mt-1">{charCount}/5000 characters</div>
              </div>
              
              {postType !== 'live' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Add relevant tags (comma separated)"
                    value={videoTags}
                    onChange={(e) => setVideoTags(e.target.value)}
                  />
                </div>
              )}
              
              {postType !== 'live' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {postType === 'short' ? 'Thumbnail' : 'Custom Thumbnail'}
                  </label>
                  <FileUpload
                    value={thumbnailFiles}
                    onValueChange={setThumbnailFiles}
                    maxFiles={1}
                    maxSize={5 * 1024 * 1024} // 5MB
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onUpload={handleThumbnailUpload}
                  >
                    <FileUpload.Dropzone className="mb-2">
                      <div className="flex flex-col items-center gap-2">
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-600 mb-1">
                          {postType === 'short' ? 'Upload short thumbnail' : 'Upload custom thumbnail'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {postType === 'short' ? '1080x1920px recommended' : '1280x720px recommended'}, Max 5MB
                        </p>
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
                  </FileUpload>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Publishing Options */}
          <Card>
            <CardHeader>
              <CardTitle>
                {postType === 'live' ? 'Stream Settings' : 'Publishing Options'}
              </CardTitle>
              <CardDescription>
                {postType === 'live' ? 'Configure your live stream settings' : 'Choose how and when to publish'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {postType === 'live' ? 'Stream Visibility' : 'Visibility'}
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="visibility" className="mr-2" defaultChecked />
                      <span className="text-sm">Public - Anyone can see this {postType === 'live' ? 'stream' : 'video'}</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="visibility" className="mr-2" />
                      <span className="text-sm">Unlisted - Only people with the link</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="visibility" className="mr-2" />
                      <span className="text-sm">Private - Only you can see this {postType === 'live' ? 'stream' : 'video'}</span>
                    </label>
                    {postType === 'live' && (
                      <label className="flex items-center">
                        <input type="radio" name="visibility" className="mr-2" />
                        <span className="text-sm">Members Only - For channel members</span>
                      </label>
                    )}
                  </div>
                </div>
                
                {postType === 'live' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stream Key</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="Your stream key will appear here"
                        readOnly
                      />
                      <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                        Copy
                      </button>
                    </div>
                  </div>
                )}
                
                {postType !== 'live' && (
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Schedule Upload</label>
                    <div className="relative inline-flex items-center">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </div>
                  </div>
                )}
                
                {postType === 'live' && (
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Enable Live Chat</label>
                    <div className="relative inline-flex items-center">
                      <input type="checkbox" className="sr-only" defaultChecked />
                      <div className="w-11 h-6 bg-red-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium">
                    {postType === 'live' ? 'Start Stream' : postType === 'short' ? 'Upload Short' : 'Upload Now'}
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
              <CardTitle>
                {postType === 'short' ? 'Short Preview' : postType === 'live' ? 'Stream Preview' : 'Video Preview'}
              </CardTitle>
              <CardDescription>
                See how your {postType === 'short' ? 'short' : postType === 'live' ? 'stream' : 'video'} will appear on YouTube
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderPreview()}
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card>
            <CardHeader>
              <CardTitle>YouTube Tips</CardTitle>
              <CardDescription>Best practices for YouTube videos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">🎬 Hook viewers early:</span> Grab attention in the first 15 seconds
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">📝 Optimize titles:</span> Use keywords and make them compelling
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">🏷️ Use relevant tags:</span> Help YouTube understand your content
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">🎨 Custom thumbnails:</span> Increase click-through rates with eye-catching images
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}