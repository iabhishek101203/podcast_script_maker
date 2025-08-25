import { useState } from 'react';
import { Copy, Download, Edit, Share2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ScriptDisplayProps {
  script: string;
  onEdit: (newScript: string) => void;
  className?: string;
}

export function ScriptDisplay({ script, onEdit, className }: ScriptDisplayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedScript, setEditedScript] = useState(script);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: 'Copied!',
        description: 'Script copied to clipboard',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  const downloadScript = () => {
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `podcast-script-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Downloaded!',
      description: 'Script saved to your device',
    });
  };

  const saveEdits = () => {
    onEdit(editedScript);
    setIsEditing(false);
    
    toast({
      title: 'Script Updated!',
      description: 'Your changes have been saved',
    });
  };

  const cancelEdits = () => {
    setEditedScript(script);
    setIsEditing(false);
  };

  const wordCount = script.split(/\s+/).length;
  const estimatedTime = Math.ceil(wordCount / 150); // Average reading speed

  return (
    <Card className={cn("w-full", className)}>
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Generated Podcast Script
            </h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Badge variant="secondary" className="gap-1">
                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                Ready
              </Badge>
              <span>{wordCount} words</span>
              <span>~{estimatedTime} min read</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="gap-2"
            >
              <Edit className="h-4 w-4" />
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="gap-2"
            >
              {copied ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={downloadScript}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        {/* Script Content */}
        <div className="space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <Textarea
                value={editedScript}
                onChange={(e) => setEditedScript(e.target.value)}
                className="min-h-96 font-mono text-sm bg-muted/30"
                placeholder="Edit your podcast script here..."
              />
              
              <div className="flex items-center gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={cancelEdits}
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveEdits}
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-muted/30 rounded-lg p-6 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-mono text-sm text-foreground leading-relaxed">
                {script}
              </pre>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="bg-accent/10 rounded-lg p-4 space-y-2">
          <h4 className="font-semibold text-accent-foreground flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Production Tips
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1 ml-6">
            <li>• Practice reading the script aloud before recording</li>
            <li>• Add natural pauses where indicated for better flow</li>
            <li>• Consider adding intro/outro music during production</li>
            <li>• Review transitions between segments for smoothness</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}