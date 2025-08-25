import { useState } from 'react';
import { Mic, Users, Clock, Settings, Sparkles, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ScriptGeneratorProps {
  fileContent: string;
  fileName: string;
  onGenerate: (script: string) => void;
  className?: string;
}

export function ScriptGenerator({ fileContent, fileName, onGenerate, className }: ScriptGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [style, setStyle] = useState('conversational');
  const [duration, setDuration] = useState('15');
  const [hosts, setHosts] = useState('2');
  const [tone, setTone] = useState('friendly');
  const { toast } = useToast();

  const generateScript = async () => {
    setIsGenerating(true);
    
    // Simulate AI script generation
    setTimeout(() => {
      const mockScript = generateMockScript();
      onGenerate(mockScript);
      setIsGenerating(false);
      
      toast({
        title: 'Script Generated!',
        description: 'Your podcast script has been created successfully.',
      });
    }, 3000);
  };

  const generateMockScript = () => {
    const hostCount = parseInt(hosts);
    const estimatedDuration = parseInt(duration);
    
    const hostNames = ['Alex', 'Jamie', 'Sam', 'Riley', 'Casey'];
    const selectedHosts = hostNames.slice(0, hostCount);
    
    return `# Podcast Script - Generated from "${fileName}"

## Episode Information
- **Duration:** ~${estimatedDuration} minutes
- **Style:** ${style.charAt(0).toUpperCase() + style.slice(1)}
- **Tone:** ${tone.charAt(0).toUpperCase() + tone.slice(1)}
- **Hosts:** ${selectedHosts.join(', ')}

---

## Opening Segment (0:00 - 1:30)

**${selectedHosts[0]}:** Welcome back to our show! I'm ${selectedHosts[0]}, and I'm here with my co-host ${selectedHosts[1] || 'the amazing team'}.

${selectedHosts[1] ? `**${selectedHosts[1]}:** Thanks ${selectedHosts[0]}! Great to be here as always.` : ''}

**${selectedHosts[0]}:** Today we're diving into some fascinating content that was shared with us. Let's jump right in!

---

## Main Content Segment (1:30 - ${estimatedDuration - 2}:00)

**${selectedHosts[0]}:** So, let's talk about the key points from our source material...

${selectedHosts[1] ? `**${selectedHosts[1]}:** Absolutely! What really caught my attention was...` : ''}

**${selectedHosts[0]}:** That's such an interesting perspective. You know, when I was reading through this, I couldn't help but think about...

${selectedHosts[1] ? `**${selectedHosts[1]}:** Exactly! And building on that point...` : ''}

**${selectedHosts[0]}:** This reminds me of something we discussed in a previous episode. The connection between these ideas is really compelling.

${selectedHosts[1] ? `**${selectedHosts[1]}:** For our listeners who might be new to this topic, let me break it down...` : ''}

**${selectedHosts[0]}:** Great explanation! Now, one thing that stands out to me is the practical application of these concepts...

---

## Discussion & Analysis (${estimatedDuration - 2}:00 - ${estimatedDuration - 0.5}:00)

**${selectedHosts[0]}:** Let's take a moment to really unpack what this means for our audience.

${selectedHosts[1] ? `**${selectedHosts[1]}:** I think the key takeaway here is...` : ''}

**${selectedHosts[0]}:** That's a fantastic point. Listeners, this is something you can actually implement in your own life by...

---

## Closing Segment (${estimatedDuration - 0.5}:00 - ${estimatedDuration}:00)

**${selectedHosts[0]}:** Well, that wraps up today's discussion. What are your thoughts on this topic?

${selectedHosts[1] ? `**${selectedHosts[1]}:** Don't forget to share your thoughts with us on social media!` : ''}

**${selectedHosts[0]}:** Thanks for listening, and we'll see you in the next episode!

---

## Production Notes
- **Music:** Fade in upbeat intro music for 15 seconds
- **Transitions:** Use subtle sound effects between segments
- **Emphasis:** Key points should be slightly emphasized in delivery
- **Pacing:** Allow natural pauses for emphasis and listener comprehension

Generated from: ${fileName}
Word count: ~${Math.floor(estimatedDuration * 150)} words
Estimated reading time: ${estimatedDuration} minutes`;
  };

  const contentPreview = fileContent.substring(0, 200) + (fileContent.length > 200 ? '...' : '');

  return (
    <Card className={cn("w-full", className)}>
      <div className="p-6 space-y-6">
        {/* File Preview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Source Material
            </Badge>
            <span className="text-sm text-muted-foreground">{fileName}</span>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground italic">
              "{contentPreview}"
            </p>
          </div>
        </div>

        {/* Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Style
            </Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conversational">Conversational</SelectItem>
                <SelectItem value="interview">Interview Style</SelectItem>
                <SelectItem value="storytelling">Storytelling</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
                <SelectItem value="debate">Debate Format</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Duration (minutes)
            </Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 minutes</SelectItem>
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="20">20 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Number of Hosts
            </Label>
            <Select value={hosts} onValueChange={setHosts}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Solo Host</SelectItem>
                <SelectItem value="2">Two Hosts</SelectItem>
                <SelectItem value="3">Three Hosts</SelectItem>
                <SelectItem value="4">Panel (4 hosts)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Tone
            </Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friendly">Friendly & Casual</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="energetic">Energetic & Fun</SelectItem>
                <SelectItem value="informative">Informative & Serious</SelectItem>
                <SelectItem value="humorous">Humorous & Light</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center pt-4">
          <Button
            onClick={generateScript}
            disabled={isGenerating || !fileContent}
            size="lg"
            className="bg-primary hover:bg-primary/90 shadow-glow min-w-48"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full mr-2" />
                Generating Script...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Podcast Script
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}