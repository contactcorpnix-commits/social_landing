import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap/minimal-tiptap';
import FileUpload from '@/components/ui/file-upload';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Preview Components
const TweetPreview = ({ content, mediaFiles }) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden">
    <div className="bg-white p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            <span className="font-semibold text-sm">Your Name</span>
            <span className="text-gray-500 text-sm">@username</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">1h</span>
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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Reply</span>
            </button>
            
            <button className="flex items-center gap-2 hover:text-green-600 hover:bg-green-50 px-2 py-1 rounded">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Retweet</span>
            </button>
            
            <button className="flex items-center gap-2 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Like</span>
            </button>
            
            <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ThreadPreview = ({ content, mediaFiles }) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden">
    <div className="bg-white p-4">
      {/* Thread line */}
      <div className="flex gap-3">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="w-0.5 h-20 bg-gray-300 mt-2"></div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            <span className="font-semibold text-sm">Your Name</span>
            <span className="text-gray-500 text-sm">@username</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">1h</span>
          </div>
          <div className="text-gray-800 mb-3">
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <p>Your thread content will appear here...</p>
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
          
          {/* Show reply indicator */}
          <div className="text-blue-600 text-sm font-medium mb-2">
            Show this thread
          </div>
        </div>
      </div>
      
      {/* Additional tweets in thread */}
      <div className="flex gap-3 mt-4">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="w-0.5 h-20 bg-gray-300 mt-2"></div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            <span className="font-semibold text-sm">Your Name</span>
            <span className="text-gray-500 text-sm">@username</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">1h</span>
          </div>
          <div className="text-gray-800 mb-3">
            <p>Additional tweets in your thread will appear here...</p>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 mt-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            <span className="font-semibold text-sm">Your Name</span>
            <span className="text-gray-500 text-sm">@username</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">1h</span>
          </div>
          <div className="text-gray-800 mb-3">
            <p>Final tweet in your thread will appear here...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SpacePreview = ({ content }) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden">
    <div className="bg-white">
      {/* Twitter Space Mock */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">Your Space Title</h3>
            <p className="text-sm opacity-90">Hosted by @username</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Live</span>
          </div>
          <span>•</span>
          <span>1.2K listeners</span>
        </div>
      </div>
      
      {/* Space description */}
      <div className="p-4">
        <div className="text-gray-800 mb-4">
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <p>Your Space description will appear here...</p>
          )}
        </div>
        
        {/* Participants */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700">Speakers (3)</div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <span className="text-sm">Speaker 1</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <span className="text-sm">Speaker 2</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <span className="text-sm">Speaker 3</span>
          </div>
        </div>
        
        {/* Join button */}
        <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm font-medium">
          Join Space
        </button>
      </div>
    </div>
  </div>
);

export default function Twitter() {
  const [postType, setPostType] = useState('tweet');
  const [tweetContent, setTweetContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDateTime, setScheduledDateTime] = useState(new Date());

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
                    <FileUpload.Item className="group">
                      <FileUpload.ItemPreview />
                      <FileUpload.ItemMetadata />
                      <FileUpload.ItemProgress />
                      <FileUpload.ItemDelete />
                    </FileUpload.Item>
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
                  <button
                    onClick={() => setIsScheduled(!isScheduled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                      isScheduled ? 'bg-black' : 'bg-gray-200'
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
                    <label className="block text-sm font-medium text-gray-700">
                      Schedule Date & Time
                    </label>
                    <DateTimePicker
                      selectedDate={scheduledDateTime}
                      selectedTime={scheduledDateTime}
                      onDateChange={setScheduledDateTime}
                      onTimeChange={setScheduledDateTime}
                    />
                  </div>
                )}
                
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                    {isScheduled ? 'Schedule' : (postType === 'space' ? 'Start Space' : 'Tweet Now')}
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