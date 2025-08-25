import { useState, useRef } from 'react';
import { Upload, File, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileContent: (content: string, fileName: string) => void;
  className?: string;
}

export function FileUpload({ onFileContent, className }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{name: string, size: number} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Check if it's a text file
    if (!file.type.startsWith('text/') && !file.name.endsWith('.txt')) {
      alert('Please upload a text file (.txt)');
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size should be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setUploadedFile({
        name: file.name,
        size: file.size
      });
      onFileContent(content, file.name);
    };
    reader.readAsText(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const clearFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      {!uploadedFile ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200",
            dragActive 
              ? "border-primary bg-primary/10" 
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Upload your text file
              </h3>
              <p className="text-muted-foreground">
                Drag and drop your .txt file here, or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Supports .txt files up to 10MB
              </p>
            </div>

            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary hover:bg-primary/90"
            >
              <File className="h-4 w-4 mr-2" />
              Choose File
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,text/*"
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </div>
      ) : (
        <div className="p-6">
          <div className="flex items-center justify-between bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{uploadedFile.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(uploadedFile.size)}
                </p>
              </div>
            </div>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={clearFile}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              File uploaded successfully! Ready to generate your podcast script.
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="text-sm"
            >
              Upload Different File
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,text/*"
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </div>
      )}
    </Card>
  );
}