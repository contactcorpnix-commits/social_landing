import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap/minimal-tiptap';
import FileUpload from '@/components/ui/file-upload';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Twitter Post Preview Components
const TweetPreview = ({ content, mediaFiles }) => {
  const getTextContent = (html) => {
    if (!html) return 0;
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent.length || div.innerText.length || 0;
  };

  const charCount = getTextContent(content);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Twitter Tweet Mock */}
      <div className="bg-white p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              <span className="font-semibold text-sm">Your Name</span>
              <span className="text-gray-500 text-sm">@yourusername</span>
              <span className="text-gray-500 text-sm">·</span>
              <span className="text-gray-500 text-sm">1m</span>
            </div>
            <div className="text-gray-800 mb-3">
              {content ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <p>Your tweet content will appear here...</p>
              )}
            </div>
            
            {/* Media placeholder */}
            {mediaFiles.length > 0 && (
              <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            
            {/* Tweet actions */}
            <div className="flex items-center justify-between text-gray-500 text-sm">
              <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                <span>0</span>
              </button>
              
              <button className="flex items-center gap-2 hover:text-green-600 hover:bg-green-50 px-2 py-1 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>0</span>
              </button>
              
              <button className="flex items-center gap-2 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>0</span>
              </button>
              
              <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Character count */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        {charCount}/280 characters
      </div>
    </div>
  );
};

const ThreadPreview = ({ content, mediaFiles }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Thread Mock */}
      <div className="bg-white p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              <span className="font-semibold text-sm">Your Name</span>
              <span className="text-gray-500 text-sm">@yourusername</span>
              <span className="text-gray-500 text-sm">·</span>
              <span className="text-gray-500 text-sm">1m</span>
            </div>
            <div className="text-gray-800 mb-3">
              {content ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <p>Your thread content will appear here...</p>
              )}
            </div>
            
            {/* Thread indicator */}
            <div className="flex items-center gap-2 text-blue-600 text-sm mb-3">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
              <span>Show this thread</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpacePreview = ({ content }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Twitter Space Mock */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">{content ? 'Your Space Title' : 'Space Title'}</h3>
            <p className="text-sm opacity-90">Hosted by @yourusername</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Live</span>
          </div>
          
          <div className="text-sm opacity-90">
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <p>Space description will appear here...</p>
            )}
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full"></div>
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full"></div>
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full"></div>
            </div>
            <span className="text-sm">3 listening</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Twitter() {
  const [postType, setPostType] = useState('tweet');
  const [tweetContent, setTweetContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);

  // Function to count text content from HTML
  const getTextContent = (html) => {
    if (!html) return 0;
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent.length || div.innerText.length || 0;
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

  const charCount = getTextContent(tweetContent);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Create Twitter Post</h1>
          <p className="text-sm text-gray-500">Share your content on Twitter</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div className="space-y-6">
          {/* Post Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Post Type</CardTitle>
              <CardDescription>Choose the type of Twitter content</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={postType} onValueChange={setPostType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select post type" />
                </SelectTrigger>
                <SelectContent className="SelectContent" position="popper" sideOffset={5} align="start" avoidCollisions={true}>
                  <SelectItem value="tweet">Tweet</SelectItem>
                  <SelectItem value="thread">Thread</SelectItem>
                  <SelectItem value="space">Space</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Account Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Account</CardTitle>
              <CardDescription>Choose which Twitter account to post from</CardDescription>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent className="SelectContent" position="popper" sideOffset={5} align="start" avoidCollisions={true}>
                  <SelectItem value="@yourusername">@yourusername</SelectItem>
                  <SelectItem value="@businesshandle">@businesshandle</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Content based on post type */}
          {postType === 'tweet' && (
            <Card>
              <CardHeader>
                <CardTitle>What's happening?</CardTitle>
                <CardDescription>Write your tweet</CardDescription>
              </CardHeader>
              <CardContent>
                <MinimalTiptapEditor
                  value={tweetContent}
                  onChange={setTweetContent}
                  placeholder="What's happening?"
                  className="w-full"
                  editorContentClassName="p-3"
                />
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-gray-500">{charCount}/280 characters</div>
                  <div className="flex gap-2">
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      Add Thread
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {postType === 'thread' && (
            <Card>
              <CardHeader>
                <CardTitle>Thread Content</CardTitle>
                <CardDescription>Write your Twitter thread</CardDescription>
              </CardHeader>
              <CardContent>
                <MinimalTiptapEditor
                  value={tweetContent}
                  onChange={setTweetContent}
                  placeholder="Start your thread..."
                  className="w-full"
                  editorContentClassName="p-3 min-h-[200px]"
                />
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-gray-500">Thread mode - Multiple tweets</div>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                    Add Tweet
                  </button>
                </div>
              </CardContent>
            </Card>
          )}

          {postType === 'space' && (
            <Card>
              <CardHeader>
                <CardTitle>Space Details</CardTitle>
                <CardDescription>Set up your Twitter Space</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Space Title</label>
                    <input
                      type="text"
                      placeholder="Enter space title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      placeholder="What's your space about?"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                    <input
                      type="datetime-local"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Media Upload (for tweet and thread) */}
          {(postType === 'tweet' || postType === 'thread') && (
            <Card>
              <CardHeader>
                <CardTitle>Add Media</CardTitle>
                <CardDescription>Upload photos, videos, or GIFs</CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  value={mediaFiles}
                  onValueChange={setMediaFiles}
                  maxFiles={postType === 'tweet' ? 4 : 10}
                  maxSize={5 * 1024 * 1024} // 5MB
                  accept="image/jpeg,image/jpg,image/png,image/gif,video/mp4"
                  onUpload={handleMediaUpload}
                >
                  <FileUpload.Dropzone className="mb-4">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-sm text-gray-600 mb-1">Drop your media here, or <span className="text-blue-600 cursor-pointer hover:underline">browse</span></p>
                      <p className="text-xs text-gray-500">Support JPG, PNG, MP4, GIF up to 5MB</p>
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
          )}

          {/* Publishing Options */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Schedule {postType === 'space' ? 'Space' : 'Tweet'}</label>
                  <div className="relative inline-flex items-center">
                    <input type="checkbox" className="sr-only" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                    {postType === 'space' ? 'Schedule Space' : 'Tweet Now'}
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
              <CardTitle>Preview</CardTitle>
              <CardDescription>See how your {postType} will look</CardDescription>
            </CardHeader>
            <CardContent>
              {postType === 'tweet' && <TweetPreview content={tweetContent} mediaFiles={mediaFiles} />}
              {postType === 'thread' && <ThreadPreview content={tweetContent} mediaFiles={mediaFiles} />}
              {postType === 'space' && <SpacePreview content={tweetContent} />}
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card>
            <CardHeader>
              <CardTitle>{postType === 'space' ? 'Space Tips' : 'Twitter Tips'}</CardTitle>
              <CardDescription>Best practices for {postType}s</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {postType === 'tweet' && (
                  <>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">📝 Keep it concise:</span> Aim for 71-100 characters for optimal engagement
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">#️⃣ Use 1-2 hashtags:</span> Keep them relevant and specific
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">🖼️ Add visuals:</span> Tweets with images get 150% more retweets
                    </div>
                  </>
                )}
                {postType === 'thread' && (
                  <>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">🔗 Connect ideas:</span> Each tweet should flow naturally to the next
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">📊 Use numbers:</span> Number your tweets (1/10, 2/10, etc.) for clarity
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">🎯 Hook first:</span> Make your first tweet compelling to encourage reading
                    </div>
                  </>
                )}
                {postType === 'space' && (
                  <>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">🎤 Plan ahead:</span> Schedule your space and promote it in advance
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">👥 Invite speakers:</span> Co-host with interesting people to attract listeners
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">💬 Engage audience:</span> Ask questions and encourage listener participation
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}