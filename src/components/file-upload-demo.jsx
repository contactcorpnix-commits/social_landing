"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Image, Video, Music, File as FileIcon } from "lucide-react";
import FileUpload from "@/components/ui/file-upload";

export function FileUploadDemo({ 
  maxFiles = 5, 
  maxSize = 10 * 1024 * 1024, // 10MB
  accept = "image/*,video/*,audio/*,.pdf,.doc,.docx,.txt" 
}) {
  const [files, setFiles] = useState([]);

  const handleUpload = async (files, { onProgress, onSuccess, onError }) => {
    // Simulate upload process
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

  const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) return <Image className="h-5 w-5" />;
    if (file.type.startsWith("video/")) return <Video className="h-5 w-5" />;
    if (file.type.startsWith("audio/")) return <Music className="h-5 w-5" />;
    if (file.type.includes("pdf") || file.type.includes("document")) return <FileText className="h-5 w-5" />;
    return <FileIcon className="h-5 w-5" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>File Upload</CardTitle>
        <CardDescription>
          Drag and drop files here or click to select files
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FileUpload
          value={files}
          onValueChange={setFiles}
          maxFiles={maxFiles}
          maxSize={maxSize}
          accept={accept}
          onUpload={handleUpload}
        >
          <FileUpload.Dropzone className="mb-4">
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-600">
                Drag & drop files here or click to select
              </p>
              <p className="text-xs text-gray-400">
                Max {maxFiles} files, {maxSize / (1024 * 1024)}MB each
              </p>
            </div>
          </FileUpload.Dropzone>

          <FileUpload.List>
            <FileUpload.Item className="group">
              <FileUpload.ItemPreview>
                {({ file }) => (
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                    {getFileIcon(file)}
                  </div>
                )}
              </FileUpload.ItemPreview>
              <FileUpload.ItemMetadata />
              <FileUpload.ItemProgress />
              <FileUpload.ItemDelete />
            </FileUpload.Item>
          </FileUpload.List>

          {files.length > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {files.length} file(s) selected
              </span>
              <FileUpload.Clear />
            </div>
          )}
        </FileUpload>
      </CardContent>
    </Card>
  );
}

export default FileUploadDemo;