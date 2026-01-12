import { useEffect, useState } from "react";
import { subscribeToAnalytics } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Activity, Minimize2, Maximize2 } from "lucide-react";

interface LogEvent {
  id: number;
  time: string;
  name: string;
  params: string;
}

export function DemoAnalytics() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<LogEvent[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAnalytics((name, params) => {
      setLogs(prev => [{
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        name,
        params: JSON.stringify(params)
      }, ...prev].slice(0, 50));
    });
    return unsubscribe;
  }, []);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 bg-black/80 text-white hover:bg-black shadow-lg rounded-full px-4 py-2 text-xs font-mono flex items-center gap-2 border border-white/10"
      >
        <Activity className="w-4 h-4 text-green-400" />
        Analytics Demo
      </Button>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 z-50 bg-background border border-border shadow-2xl rounded-lg w-64 overflow-hidden">
        <div className="p-3 flex items-center justify-between bg-muted/50 cursor-pointer" onClick={() => setIsMinimized(false)}>
            <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <span className="font-bold text-xs">Live Analytics</span>
            </div>
            <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); setIsMinimized(false); }}>
                    <Maximize2 className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}>
                    <X className="h-3 w-3" />
                </Button>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-background border border-border shadow-2xl rounded-xl w-80 sm:w-96 overflow-hidden flex flex-col max-h-[500px] animate-in slide-in-from-bottom-5 fade-in duration-300">
      <CardHeader className="p-3 py-2 bg-muted/50 border-b flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary animate-pulse" />
          <CardTitle className="text-sm font-bold">Live Data Stream</CardTitle>
        </div>
        <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsMinimized(true)}>
                <Minimize2 className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                <X className="h-3 w-3" />
            </Button>
        </div>
      </CardHeader>
      <div className="bg-muted/20 p-2 text-[10px] text-muted-foreground border-b text-center">
        This panel simulates what you would see in a real dashboard like Google Analytics or PostHog.
      </div>
      <ScrollArea className="flex-1 p-2 h-[300px]">
        {logs.length === 0 ? (
          <div className="text-center text-muted-foreground text-xs py-8 opacity-50">
            Waiting for interactions...
            <br />
            (Try clicking buttons or scrolling)
          </div>
        ) : (
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="text-xs bg-card border rounded-md p-2 shadow-sm">
                <div className="flex justify-between text-muted-foreground text-[10px] mb-1">
                  <span className="font-mono">{log.time}</span>
                  <span className="text-primary font-bold">{log.name}</span>
                </div>
                <div className="font-mono text-[10px] text-foreground/80 break-all bg-muted/30 p-1 rounded">
                  {log.params}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
