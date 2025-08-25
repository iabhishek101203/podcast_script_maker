import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { ScriptGenerator } from '@/components/ScriptGenerator';
import { ScriptDisplay } from '@/components/ScriptDisplay';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic2, FileText, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

const Index = () => {
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const handleFileContent = (content: string, name: string) => {
    setFileContent(content);
    setFileName(name);
    setCurrentStep(2);
  };

  const handleScriptGeneration = (script: string) => {
    setGeneratedScript(script);
    setCurrentStep(3);
  };

  const handleScriptEdit = (newScript: string) => {
    setGeneratedScript(newScript);
  };

  const resetProcess = () => {
    setFileContent('');
    setFileName('');
    setGeneratedScript('');
    setCurrentStep(1);
  };

  const steps = [
    { number: 1, title: 'Upload Text', icon: FileText, completed: currentStep > 1 },
    { number: 2, title: 'Configure Script', icon: Sparkles, completed: currentStep > 2 },
    { number: 3, title: 'Review & Edit', icon: Mic2, completed: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Mic2 className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Script Craft
              </h1>
              <p className="text-xs text-muted-foreground">AI Podcast Script Generator</p>
            </div>
          </div>
          
          {currentStep > 1 && (
            <Button 
              variant="outline" 
              onClick={resetProcess}
              className="text-sm"
            >
              Start Over
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        {currentStep === 1 && (
          <section className="text-center mb-12">
            <div className="max-w-3xl mx-auto space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Transform Text into Engaging Podcasts
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                Turn Your Content Into
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {' '}Professional Scripts
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload any text file and our AI will transform it into an engaging, 
                well-structured podcast script ready for recording. Choose your style, 
                duration, and host configuration.
              </p>
            </div>
          </section>
        )}

        {/* Progress Steps */}
        <section className="mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`
                      h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                      ${currentStep >= step.number 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : 'border-border bg-background text-muted-foreground'
                      }
                      ${step.completed ? 'bg-green-500 border-green-500' : ''}
                    `}>
                      {step.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <step.icon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <p className={`text-sm font-medium ${
                        currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`
                      flex-1 h-0.5 mx-4 transition-colors duration-300
                      ${currentStep > step.number ? 'bg-primary' : 'bg-border'}
                    `} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step Content */}
        <section className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <div className="space-y-8">
              <FileUpload onFileContent={handleFileContent} />
              
              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center space-y-3">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Easy Upload</h3>
                  <p className="text-sm text-muted-foreground">
                    Simply drag and drop your .txt file or click to browse. Supports files up to 10MB.
                  </p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">AI-Powered</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced AI analyzes your content and creates engaging, natural-sounding scripts.
                  </p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Mic2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Ready to Record</h3>
                  <p className="text-sm text-muted-foreground">
                    Get professionally formatted scripts with timing, cues, and production notes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <ScriptGenerator
              fileContent={fileContent}
              fileName={fileName}
              onGenerate={handleScriptGeneration}
            />
          )}

          {currentStep === 3 && (
            <ScriptDisplay
              script={generatedScript}
              onEdit={handleScriptEdit}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default Index;