import React, { useState } from 'react';
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

export default function LinkedIn() {
  const [postContent, setPostContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [postType, setPostType] = useState('post');
  const [selectedAccount, setSelectedAccount] = useState('personal');
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

  const charCount = getTextContent(postContent);

  // Dynamic preview component based on post type
  const renderPreview = () => {
    switch (postType) {
      case 'article':
        return <ArticlePreview content={postContent} mediaFiles={mediaFiles} />;
      case 'image':
        return <ImagePreview content={postContent} mediaFiles={mediaFiles} />;
      case 'video':
        return <VideoPreview content={postContent} mediaFiles={mediaFiles} />;
      case 'document':
        return <DocumentPreview content={postContent} mediaFiles={mediaFiles} />;
      default:
        return <PostPreview content={postContent} mediaFiles={mediaFiles} />;
    }
  };

  // Preview Components
  const PostPreview = ({ content, mediaFiles }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-white p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              <span className="font-semibold text-sm">Your Name</span>
              <span className="text-gray-500 text-sm">· 1st</span>
            </div>
            <div className="text-gray-500 text-xs mb-2">Your headline • 1m</div>
            <div className="text-gray-800 mb-3">
              {content ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <p>Your post content will appear here...</p>
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
            
            {/* Post stats */}
            <div className="flex items-center justify-between text-gray-500 text-sm border-t pt-3">
              <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span>Like</span>
              </button>
              
              <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Comment</span>
              </button>
              
              <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>Share</span>
              </button>
              
              <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ArticlePreview = ({ content, mediaFiles }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-white">
        {/* Article Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-sm">Your Name</span>
                <span className="text-gray-500 text-sm">· 1st</span>
              </div>
              <div className="text-gray-500 text-xs">Your headline</div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mb-2">Article • 5 min read</div>
        </div>
        
        {/* Article Content */}
        <div className="p-4">
          <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {content ? 'Your Article Title' : 'Your article title will appear here...'}
          </h2>
          
          <div className="text-gray-600 mb-4">
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <p>Your article content will appear here...</p>
            )}
          </div>
          
          <button className="text-blue-600 font-medium text-sm hover:underline">
            Read more
          </button>
        </div>
        
        {/* Article Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between text-gray-500 text-sm">
            <span>0 likes</span>
            <span>0 comments</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ImagePreview = ({ content, mediaFiles }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-white p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              <span className="font-semibold text-sm">Your Name</span>
              <span className="text-gray-500 text-sm">· 1st</span>
            </div>
            <div className="text-gray-500 text-xs mb-2">Your headline • 1m</div>
          </div>
        </div>
        
        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {mediaFiles.length > 0 ? (
            mediaFiles.slice(0, 4).map((file, index) => (
              <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            ))
          ) : (
            <div className="col-span-2 aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        
        {content && (
          <div className="text-gray-800 mb-3">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}
        
        {/* Post stats */}
        <div className="flex items-center justify-between text-gray-500 text-sm border-t pt-3">
          <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span>Like</span>
          </button>
          
          <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Comment</span>
          </button>
          
          <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>Share</span>
          </button>
          
          <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );

  const VideoPreview = ({ content, mediaFiles }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-white p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              <span className="font-semibold text-sm">Your Name</span>
              <span className="text-gray-500 text-sm">· 1st</span>
            </div>
            <div className="text-gray-500 text-xs mb-2">Your headline • 1m</div>
          </div>
        </div>
        
        {/* Video Player */}
        <div className="aspect-video bg-gray-900 rounded-lg mb-3 flex items-center justify-center relative">
          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            0:00
          </div>
        </div>
        
        {content && (
          <div className="text-gray-800 mb-3">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}
        
        {/* Post stats */}
        <div className="flex items-center justify-between text-gray-500 text-sm border-t pt-3">
          <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span>Like</span>
          </button>
          
          <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Comment</span>
          </button>
          
          <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>Share</span>
          </button>
          
          <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );

  const DocumentPreview = ({ content, mediaFiles }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-white p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              <span className="font-semibold text-sm">Your Name</span>
              <span className="text-gray-500 text-sm">· 1st</span>
            </div>
            <div className="text-gray-500 text-xs mb-2">Your headline • 1m</div>
          </div>
        </div>
        
        {/* Document Card */}
        <div className="border border-gray-200 rounded-lg p-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Document Title</h3>
              <p className="text-sm text-gray-500">PDF • 2.5 MB</p>
            </div>
            <button className="text-blue-600 text-sm font-medium hover:underline">
              View
            </button>
          </div>
        </div>
        
        {content && (
          <div className="text-gray-800 mb-3">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}
        
        {/* Post stats */}
        <div className="flex items-center justify-between text-gray-500 text-sm border-t pt-3">
          <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span>Like</span>
          </button>
          
          <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Comment</span>
          </button>
          
          <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>Share</span>
          </button>
          
          <button className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>Send</span>
          </button>
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
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Create LinkedIn Post</h1>
          <p className="text-sm text-gray-500">Share professional content on LinkedIn</p>
        </div>
      </div>

      {/* LinkedIn Post Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div className="space-y-6">
          {/* Account Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Account</CardTitle>
              <CardDescription>Choose which LinkedIn account to post from</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent className="SelectContent" position="popper" sideOffset={5} align="start" avoidCollisions={true}>
                  <SelectItem value="personal">Personal Profile</SelectItem>
                  <SelectItem value="company">Company Page</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Post Type */}
          <Card>
            <CardHeader>
              <CardTitle>Post Type</CardTitle>
              <CardDescription>What type of content are you sharing?</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={postType} onValueChange={setPostType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select post type" />
                </SelectTrigger>
                <SelectContent className="SelectContent" position="popper" sideOffset={5} align="start" avoidCollisions={true}>
                  <SelectItem value="post">Post - Simple text post</SelectItem>
                  <SelectItem value="article">Article - Long-form content</SelectItem>
                  <SelectItem value="image">Image - Photo with caption</SelectItem>
                  <SelectItem value="video">Video - Video content</SelectItem>
                  <SelectItem value="document">Document - PDF or presentation</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Post Content */}
          <Card>
            <CardHeader>
              <CardTitle>What do you want to talk about?</CardTitle>
              <CardDescription>Share your thoughts and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <MinimalTiptapEditor
                value={postContent}
                onChange={setPostContent}
                placeholder="What do you want to talk about?"
                className="w-full"
                editorContentClassName="p-3"
              />
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs text-gray-500">{charCount}/3000 characters</div>
                <div className="flex gap-2">
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                    Add Hashtag
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Add Media</CardTitle>
              <CardDescription>Upload photos, videos, or documents</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                value={mediaFiles}
                onValueChange={setMediaFiles}
                maxFiles={9}
                maxSize={100 * 1024 * 1024} // 100MB
                accept="image/jpeg,image/jpg,image/png,image/gif,video/mp4,video/mov,application/pdf"
                onUpload={handleMediaUpload}
              >
                <FileUpload.Dropzone className="mb-4">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600 mb-1">Drop your media here, or <span className="text-blue-600 cursor-pointer hover:underline">browse</span></p>
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
                  <button
                    onClick={() => setIsScheduled(!isScheduled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
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
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Schedule Date & Time</label>
                    <DateTimePicker
                      selectedDate={scheduledDateTime}
                      selectedTime={scheduledDateTime}
                      onDateTimeChange={setScheduledDateTime}
                    />
                  </div>
                )}
                
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                    {isScheduled ? 'Schedule Post' : 'Post Now'}
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
              <CardDescription>See how your post will look on LinkedIn</CardDescription>
            </CardHeader>
            <CardContent>
              {renderPreview()}
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card>
            <CardHeader>
              <CardTitle>LinkedIn Tips</CardTitle>
              <CardDescription>Best practices for LinkedIn posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">🎯 Be professional:</span> Use a professional tone and avoid overly casual language
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">💡 Share insights:</span> Provide value through industry knowledge and expertise
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">🔗 Engage authentically:</span> Respond to comments and engage with your network
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}