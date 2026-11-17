import React, { useState, useEffect, useRef } from "react";
import { 
  BookOpen, 
  Send, 
  Sparkles, 
  FileText, 
  Terminal, 
  ArrowRight, 
  Trash2, 
  AlertCircle, 
  ExternalLink, 
  Code2, 
  Compass, 
  HelpCircle, 
  RefreshCw, 
  Sliders,
  Notebook,
  ChevronRight,
  UserCheck,
  Search,
  X,
  Globe,
  SlidersHorizontal,
  Bookmark,
  Check,
  Edit2
} from "lucide-react";
import { PROMPT_TEMPLATES } from "./data";
import { ChatMessage, PromptTemplate } from "./types";

const SUGGESTED_SEARCH_TOPICS = [
  "Brainstorm five fun side-project ideas combining AI and gaming",
  "Explain quantum computers using simple analogies",
  "Write a funny sci-fi story script about two rogue robots",
  "Explain how the internet works under the hood step by step",
  "Socratic debate: Is artificial general intelligence possible or a myth?",
  "Draft a structured study guide for mastering typescript in 30 days",
  "What does a senior solutions architect do on a daily basis?"
];

const PERSONA_PRESETS = [
  {
    name: "🧠 Witty Sandbox Tutor",
    tagline: "The default clever MindQuest companion",
    prompt: "You are MindQuest, a friendly, witty, encouraging, and highly versatile AI tutor and conversational partner. Give brilliant, clear responses, creative brainstorming assistance, Socratic tutoring, and coding help on any topic."
  },
  {
    name: "🎭 Cyberpunk Storyteller",
    tagline: "Spins sci-fi space-opera tales with humor",
    prompt: "You are a creative cyberpunk novelist and dramatic Sci-Fi storyteller. Answer the user's queries through the lens of dystopian space operas, high-tech conspiracies, or witty android banter while keeping concepts accurate but wildly imaginative."
  },
  {
    name: "🧙‍♂️ TypeScript Sorcerer",
    tagline: "Ancient tech wizard with mystic code analogies",
    prompt: "You are an ancient, epic code sorcerer who has spent 500 years studying TypeScript and cloud architectures. Answer technical and general questions with mystic spells, runic metaphors, and flawless, elite programming scripts."
  },
  {
    name: "🦉 Socratic Philosopher",
    tagline: "Launches deep, thought-provoking questions",
    prompt: "You are a highly intellectual Socratic philosopher. Instead of giving direct answers, ask the user deep, challenging, yet encouraging questions to help them uncover insights or deconstruct theories step-by-step."
  },
  {
    name: "🃏 Stand-up Comedian",
    tagline: "Uses hilarious dad jokes, memes & puns for everything",
    prompt: "You are a hilarious, meme-fluent AI mentor who uses absurd analogies, dad jokes, and pop-culture puns to explain anything from general trivia to complex science topics."
  }
];

const getThemeStyles = (theme: string) => {
  switch (theme) {
    case "pink":
      return {
        text: "text-pink-400",
        border: "border-pink-500/30",
        borderHover: "hover:border-pink-500/50",
        bg: "bg-pink-500/10",
        bgActive: "bg-pink-950/20",
        gradient: "from-pink-500 to-purple-500",
        shadow: "shadow-[0_0_15px_rgba(255,0,171,0.1)]",
        neonShadow: "shadow-neon-pink",
        badge: "bg-pink-500/10 text-pink-300 border-pink-500/30",
        glowText: "drop-shadow-[0_0_6px_rgba(255,0,171,0.25)]",
      };
    case "cyan":
      return {
        text: "text-cyan-400",
        border: "border-cyan-500/30",
        borderHover: "hover:border-cyan-500/50",
        bg: "bg-cyan-500/10",
        bgActive: "bg-cyan-950/20",
        gradient: "from-cyan-500 to-teal-500",
        shadow: "shadow-[0_0_15px_rgba(0,240,255,0.15)]",
        neonShadow: "shadow-neon-cyan",
        badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
        glowText: "drop-shadow-[0_0_6px_rgba(0,240,255,0.25)]",
      };
    default:
      return {
        text: "text-pink-400",
        border: "border-pink-500/30",
        borderHover: "hover:border-pink-500/50",
        bg: "bg-pink-500/10",
        bgActive: "bg-pink-950/20",
        gradient: "from-pink-500 to-purple-500",
        shadow: "shadow-[0_0_15px_rgba(255,0,171,0.1)]",
        neonShadow: "shadow-neon-pink",
        badge: "bg-pink-500/10 text-pink-300 border-pink-500/30",
        glowText: "drop-shadow-[0_0_8px_rgba(255,0,171,0.3)]",
      };
  }
};

export default function App() {
  // Versatile Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Online API search states
  const [onlineSearchResults, setOnlineSearchResults] = useState<Array<{
    type: string;
    title: string;
    subtitle: string;
    meta?: string;
    badge: string;
    additionalInfo?: string;
    source: string;
  }>>([]);
  const [isOnlineSearching, setIsOnlineSearching] = useState(false);
  const [selectedOnlineItem, setSelectedOnlineItem] = useState<{
    type: string;
    title: string;
    subtitle: string;
    meta?: string;
    badge: string;
    additionalInfo?: string;
    source: string;
  } | null>(null);

  // Active Scratchpad Reset confirmation state
  const [resetConfirmStep, setResetConfirmStep] = useState(false);

  // MindQuest Persona configuration and panel trigger
  const [isPersonaOpen, setIsPersonaOpen] = useState(false);
  const [personaDraft, setPersonaDraft] = useState("");

  // Reset online search results when query changes
  useEffect(() => {
    setOnlineSearchResults([]);
  }, [searchQuery]);

  // Primary AI Chat Workspace states
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("mindquest_primary_chat_history");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: "pri-wel-1",
        role: "assistant",
        text: "Hi there! 👋 Welcome to **MindQuest AI Playground**, your ultimate interactive curiosity sandbox and study workspace!\n\nI am your primary conversational companion. Ask me absolutely anything—from complex quantum physics, fun sci-fi storytelling, tricky programming codes, to general-purpose trivia and brainstorming session helpers!\n\nFeel free to explore the **Interactive Search Box** at the top or try out the structured **Quick AI Modes** above to test different learning styles. Let's explore some brilliant ideas together! ⚡",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });
  const [chatInput, setChatInput] = useState<string>("");
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const [chatSystemInstruction, setChatSystemInstruction] = useState<string>(
    "You are MindQuest, a friendly, witty, encouraging, and highly versatile AI tutor and conversational partner. Give brilliant, clear responses, creative brainstorming assistance, Socratic tutoring, and coding help on any topic."
  );

  // Notes Assistant & Scratchpad states
  const [scratchpadNotes, setScratchpadNotes] = useState<string>(() => {
    const saved = localStorage.getItem("mindquest_scratchpad_notes");
    return saved !== null ? saved : `# MindQuest Active Notes 📝\nType or paste any notes, ideas, summaries, study content, or code drafts right here!\n\n- Brainstorm your upcoming side-project idea or organize your daily schedule.\n- Click the Quick Notebook actions below (like "🪄 Summarize", "❓ Quiz Me", or "📝 Flashcards") to let your private Notes Helper AI review, format, or test you interactively on whatever materials you keep in this notepad!`;
  });

  const [notesChatHistory, setNotesChatHistory] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("mindquest_notes_chat_history");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: "notes-wel-1",
        role: "assistant",
        text: "Hi! 📝 I am your dedicated **AI Notes Companion**. I am a separate conversational bot designed specifically to inspect, expand, format, review or quiz you on whichever active materials you maintain in the scratchpad box above.\n\nWrite anything in the notepad and type a question here, or click one of the quick triggers below to start reviewing!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });
  const [notesChatInput, setNotesChatInput] = useState<string>("");
  const [isNotesChatLoading, setIsNotesChatLoading] = useState<boolean>(false);

  // Global Info Alert Indicator
  const [alertInfo, setAlertInfo] = useState<{ type: "error" | "info"; message: string } | null>(null);

  // Auto-save history & notes to localStorage
  useEffect(() => {
    localStorage.setItem("mindquest_primary_chat_history", JSON.stringify(chatHistory));
    scrollToChatBottom(primaryScrollContainerRef);
  }, [chatHistory]);

  useEffect(() => {
    localStorage.setItem("mindquest_scratchpad_notes", scratchpadNotes);
  }, [scratchpadNotes]);

  useEffect(() => {
    localStorage.setItem("mindquest_notes_chat_history", JSON.stringify(notesChatHistory));
    scrollToChatBottom(notesScrollContainerRef);
  }, [notesChatHistory]);

  // Scrolling References
  const primaryScrollContainerRef = useRef<HTMLDivElement>(null);
  const notesScrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToChatBottom = (containerRef: React.RefObject<HTMLDivElement | null>) => {
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: "smooth"
        });
      }
    }, 50);
  };

  // Perform Broadened AI Search relative to anything
  const broadenSearchOnline = async (queryToSearch: string) => {
    if (!queryToSearch.trim()) return;
    setIsOnlineSearching(true);
    setOnlineSearchResults([]);
    setAlertInfo(null);
    try {
      const resp = await fetch("/api/search-online", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryToSearch })
      });
      const data = await resp.json();
      if (data && Array.isArray(data.results)) {
        setOnlineSearchResults(data.results);
      } else {
        setAlertInfo({ type: "error", message: "No custom results could be loaded from online directory." });
      }
    } catch {
      setAlertInfo({ type: "error", message: "Error connecting to online career & course database." });
    } finally {
      setIsOnlineSearching(false);
    }
  };

  // Primary Chat Message submission handler
  const sendChatMessage = async (customPrompt?: string) => {
    const rawInput = customPrompt || chatInput;
    if (!rawInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      text: rawInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMsg]);
    if (!customPrompt) setChatInput("");
    setIsChatLoading(true);
    setAlertInfo(null);

    try {
      const historyPayload = chatHistory.map(h => ({
        role: h.role === "assistant" ? "model" : "user",
        text: h.text
      }));

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: rawInput,
          history: historyPayload,
          systemInstruction: chatSystemInstruction
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred with the Gemini API proxy.");
      }

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        text: data.text || "I processed your request, but returned an empty response.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setAlertInfo({
        type: "error",
        message: err.message || "Failed to contact proxy. Please check your secrets."
      });
      
      setChatHistory(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: "assistant",
          text: `⚠️ **API Key Action Required**\n\nI was unable to complete this query. Since this application operates securely using a full-stack server proxy, please check if your **GEMINI_API_KEY** has been configured in the **Secrets** menu (Settings Gear in upper right of AI Studio UI).\n\nIf you have already configured it, make sure there are no typos!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Dedicated Notes Chat Message submission handler
  const sendNotesChatMessage = async (specialCommand?: string) => {
    const inputToUse = specialCommand || notesChatInput;
    if (!inputToUse.trim()) return;

    const userMsg: ChatMessage = {
      id: `notes-usr-${Date.now()}`,
      role: "user",
      text: inputToUse,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setNotesChatHistory(prev => [...prev, userMsg]);
    if (!specialCommand) setNotesChatInput("");
    setIsNotesChatLoading(true);

    try {
      const historyPayload = notesChatHistory.map(h => ({
        role: h.role === "assistant" ? "model" : "user",
        text: h.text
      }));

      // Inject the current raw notes scratchpad content into Notes assistant context
      const customNotesInstruction = `You are a private AI Notes Assistant. Your sole mandate is to analyze, review, format, evaluate, or design quizzes based strictly on the user's active scratchpad notes. Address their queries encouragingly, structured in markdown templates, and maintain a highly instructive academic persona.
      
[CURRENT RAW NOTES IN SCRATCHPAD NOTEBOX]:
"""
${scratchpadNotes}
"""`;

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: inputToUse,
          history: historyPayload,
          systemInstruction: customNotesInstruction
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to contact proxy.");
      }

      const assistantMsg: ChatMessage = {
        id: `notes-ai-${Date.now()}`,
        role: "assistant",
        text: data.text || "Processed notes successfully.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setNotesChatHistory(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setNotesChatHistory(prev => [
        ...prev,
        {
          id: `notes-ai-err-${Date.now()}`,
          role: "assistant",
          text: `⚠️ **Notes Assistance Unavailable**\nCould not fetch response: ${err.message}. Ensure your GEMINI_API_KEY is configured correctly under Settings > Secrets.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsNotesChatLoading(false);
    }
  };

  // Triggers for instant notes analysis
  const triggerNoteSummary = () => {
    if (!scratchpadNotes.trim()) {
      setAlertInfo({ type: "info", message: "Write or paste some notes in the scratchpad first!" });
      return;
    }
    sendNotesChatMessage("Analyze my active scratchpad notes content. Please construct a brilliant, comprehensive study outline summarizing the core terms, definitions, and underlying lessons beautifully.");
  };

  const triggerNoteQuiz = () => {
    if (!scratchpadNotes.trim()) {
      setAlertInfo({ type: "info", message: "Write or paste some notes in the scratchpad first!" });
      return;
    }
    sendNotesChatMessage("Review my active scratchpad notes content. Please design an interactive, multiple-choice study quiz comprising 3 challenging questions to test my retention on what's written. I will answer them next!");
  };

  const triggerNoteExpanding = () => {
    if (!scratchpadNotes.trim()) {
      setAlertInfo({ type: "info", message: "Write or paste some notes in the scratchpad first!" });
      return;
    }
    sendNotesChatMessage("Review my active scratchpad notes content. Please structure it with professional headings, improve visual readability, elaborate on any complex or brief points with clear explanations, and propose relevant practical test project ideas.");
  };

  const triggerFlashcardGeneration = () => {
    if (!scratchpadNotes.trim()) {
      setAlertInfo({ type: "info", message: "Write or paste some notes in the scratchpad first!" });
      return;
    }
    sendNotesChatMessage("Process my active notes. Please synthesize the key definitions or formulas into a series of clear, highly portable Flashcard study definitions formatted as [QUESTION] vs [ANSWER/CONCEPT DECONSTRUCTION] so I can study them card-by-card.");
  };

  // Clear Chats
  const clearPrimaryChat = () => {
    setChatHistory([
      {
        id: `pri-wel-res-${Date.now()}`,
        role: "assistant",
        text: "MindQuest playground chat history cleared. What topic or concept can we explore together next? ⚡",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const clearNotesChat = () => {
    setNotesChatHistory([
      {
        id: `notes-wel-res-${Date.now()}`,
        role: "assistant",
        text: "Notes Assistant conversation cleared! Update your scratchpad above and ask me questions or click the quick helpers underneath.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Load Prompt templates directly 
  const loadPromptBehavior = (tmpl: PromptTemplate) => {
    setChatSystemInstruction(tmpl.systemPrompt);
    setChatInput(tmpl.placeholderText);
    setAlertInfo({ type: "info", message: `System Mode updated: "${tmpl.title}". You can modify the prepopulated text in the box below.` });
  };

  // Custom Inline Markdown Parser
  function renderMarkdown(text: string) {
    if (!text) return null;
    
    const lines = text.split("\n");
    let inCodeBlock = false;
    let codeLines: string[] = [];
    
    return lines.map((line, idx) => {
      // Code Blocks
      if (line.trim().startsWith("```")) {
        if (inCodeBlock) {
          inCodeBlock = false;
          const codeText = codeLines.join("\n");
          codeLines = [];
          return (
            <div key={idx} className="my-3 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900/90 shadow-2xl">
              <div className="flex bg-zinc-850 px-4 py-1.5 text-2xs font-mono text-zinc-400 justify-between items-center border-b border-zinc-800">
                <span>TS / CONTEXT PROTOCOL</span>
                <span className="text-cyan-400">code</span>
              </div>
              <pre className="p-4 font-mono text-xs overflow-x-auto text-cyan-300 bg-black/60">
                <code>{codeText}</code>
              </pre>
            </div>
          );
        } else {
          inCodeBlock = true;
          return null;
        }
      }
      
      if (inCodeBlock) {
        codeLines.push(line);
        return null;
      }

      // Headers
      if (line.startsWith("### ")) {
        return <h4 key={idx} className="text-xs font-black text-cyan-300 mt-4 mb-1.5 uppercase tracking-wide flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-pink-400 shrink-0" /> {line.slice(4)}</h4>;
      }
      if (line.startsWith("## ")) {
        return <h3 key={idx} className="text-sm font-bold text-zinc-100 mt-5 mb-2 border-b border-zinc-800 pb-1 tracking-tight">{line.slice(3)}</h3>;
      }
      if (line.startsWith("# ")) {
        return <h2 key={idx} className="text-base font-black text-white mt-6 mb-3 border-b border-pink-500/20 pb-1.5 tracking-wider uppercase">{line.slice(2)}</h2>;
      }
      
      // Inline formatting helper
      const formatInline = (textStr: string) => {
        const parts = textStr.split(/(\*\*.*?\*\*|`.*?`)/);
        return parts.map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={i} className="font-extrabold text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.15)]">{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith("`") && part.endsWith("`")) {
            return <code key={i} className="bg-black/40 text-rose-300 border border-purple-500/10 px-1.5 py-0.5 rounded font-mono text-[10px]">{part.slice(1, -1)}</code>;
          }
          return part;
        });
      };

      // Lists
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={idx} className="list-disc list-inside text-xs text-zinc-300 ml-3.5 my-1.5 leading-relaxed font-normal">
            {formatInline(line.slice(2))}
          </li>
        );
      }
      
      // General paragraph
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="text-xs text-zinc-300 leading-relaxed my-1">
          {formatInline(line)}
        </p>
      );
    });
  }

  return (
    <div className="min-h-screen bg-[#03010b] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/20 via-[#030110] to-[#010006] text-zinc-100 flex flex-col font-sans transition-all selection:bg-pink-550 selection:text-white">

      {/* Decorative Neon Grid Lines overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f134509_1px,transparent_1px),linear-gradient(to_bottom,#1f134509_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      {/* 1. Header & Dynamic Versatile Search Console */}
      <header className="border-b border-purple-500/10 bg-[#07021c]/85 backdrop-blur-md sticky top-0 z-50 px-6 py-4 shadow-[0_5px_30px_rgba(15,3,40,0.8)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          {/* Brand Name Title */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-purple-600 p-2 rounded-xl border border-pink-400/30 text-white animate-spin-slow shadow-[0_0_15px_rgba(255,0,171,0.25)]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black font-display tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 drop-shadow-[0_0_10px_rgba(255,0,171,0.35)]">
                  MindQuest
                </h1>
                <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-pink-500/15 border border-pink-500/30 text-pink-300 shadow-[0_0_8px_rgba(255,0,171,0.2)] tracking-wider">
                  PLAYGROUND 🔮
                </span>
              </div>
              <p className="text-[10px] text-zinc-400/80 mt-0.5 leading-none">
                Interactive AI Sandbox & Notes Oasis
              </p>
            </div>
          </div>

          {/* Core Interactive Search Bar */}
          <div className="relative w-full md:w-80 lg:w-[450px] z-50">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-cyan-400" />
              </span>
              <input
                type="text"
                placeholder="Explore or Ask anything (sci-fi, stories, code, math, philosophy)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-[#03010b] border border-cyan-500/20 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all shadow-[0_0_15px_rgba(0,0,0,0.6)] font-semibold"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Floating Dropdown Results */}
            {isSearchFocused && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-transparent" 
                  onClick={() => setIsSearchFocused(false)} 
                />
                
                <div className="absolute left-0 right-0 mt-2 bg-[#09031d]/95 border border-cyan-500/35 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.95)] z-50 overflow-hidden backdrop-blur-md max-h-[480px] overflow-y-auto divide-y divide-purple-500/10">
                  
                  {/* If no search input, show helpful presets */}
                  {!searchQuery.trim() ? (
                    <div className="p-3">
                      <div className="text-[9px] font-bold text-cyan-400/80 uppercase tracking-widest pl-1.5 mb-2 flex items-center gap-1">
                        <Compass className="w-3 h-3 text-cyan-400 animate-pulse" />
                        <span>Suggested Topics & Skills to Explore</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {SUGGESTED_SEARCH_TOPICS.map((topic, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setSearchQuery(topic);
                              broadenSearchOnline(topic);
                            }}
                            className="w-full text-left py-1.5 px-2 hover:bg-cyan-950/20 rounded-lg text-2xs text-zinc-400 hover:text-cyan-300 transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <ChevronRight className="w-3 h-3 text-zinc-650 shrink-0" />
                            <span className="truncate">{topic}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Search controls */}
                      <div className="p-1 px-3 bg-[#11052c] text-[10px] font-black text-zinc-400 uppercase tracking-wider flex justify-between items-center py-2.5">
                        <span>SEARCHING ENGINE</span>
                        <span className="text-cyan-400 font-bold font-mono">VERSATILE MATCHES</span>
                      </div>

                      {/* Direct prompt action block */}
                      <div className="p-2.5 bg-purple-950/20 text-xs border-b border-purple-500/10">
                        <button
                          type="button"
                          onClick={() => {
                            sendChatMessage(`Could you analyze and explain "${searchQuery}" in depth? Outline the core skills required, learning prerequisites, and high-paying remote career applications corresponding to it.`);
                            setSearchQuery("");
                            setIsSearchFocused(false);
                          }}
                          className="w-full p-2.5 text-left rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/20 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all text-xs flex justify-between items-center cursor-pointer text-pink-200"
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-pink-400 animate-bounce" />
                            <div>
                              <p className="font-bold leading-tight">Query Workspace AI Companion on this</p>
                              <p className="text-[10px] text-zinc-400 mt-0.5 mt-1 leading-none font-sans">Leverage Socratic deconstruction of "{searchQuery}"</p>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-pink-400" />
                        </button>
                      </div>

                      {/* Global live database trigger */}
                      <div className="p-2 bg-[#12052c]/90 flex flex-col gap-2 items-stretch border-t border-purple-500/10">
                        {!isOnlineSearching && onlineSearchResults.length === 0 && (
                          <button
                            type="button"
                            onClick={() => broadenSearchOnline(searchQuery)}
                            className="w-full py-2 px-3 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-950/20 border border-cyan-500/30 hover:bg-cyan-950/40 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                          >
                            <Globe className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                            <span>Broaden Search to Global Databases (Coursera, edX, AWS)</span>
                          </button>
                        )}
                        
                        {isOnlineSearching && (
                          <div className="py-2.5 px-2 flex items-center justify-center gap-2 text-xs text-zinc-400 font-sans">
                            <span className="w-3.5 h-3.5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin inline-block shrink-0" />
                            <span className="animate-pulse font-semibold">Broadening search through global educational databases...</span>
                          </div>
                        )}
                      </div>

                      {/* Online Database Search Output matches */}
                      {onlineSearchResults.length > 0 && (
                        <div className="divide-y divide-purple-500/10 bg-cyan-950/5">
                          <div className="p-2.5 text-[9px] font-black text-cyan-400 uppercase tracking-widest bg-[#0f1d3a]/60 flex justify-between items-center border-t border-purple-500/20">
                            <span>ONLINE DIRECTORY MATCHES</span>
                            <span>{onlineSearchResults.length} Recs Found</span>
                          </div>
                          
                          {onlineSearchResults.map((result, i) => (
                            <button
                              key={`online-${i}`}
                              type="button"
                              onClick={() => {
                                setSelectedOnlineItem(result);
                              }}
                              className="w-full p-3 text-left hover:bg-cyan-950/20 hover:border-l-2 hover:border-cyan-400 transition-all flex flex-col gap-0.5 cursor-pointer text-xs"
                            >
                              <div className="flex justify-between items-center gap-2">
                                <span className="font-extrabold text-white truncate pr-2">
                                  {result.title}
                                </span>
                                <span className="text-[8px] font-black px-1.5 py-0.5 rounded leading-none shrink-0 border bg-cyan-500/15 text-cyan-300 border-cyan-500/30">
                                  {result.badge}
                                </span>
                              </div>
                              <div className="flex justify-between items-center mt-1 text-[10px] text-zinc-400">
                                <span className="font-medium text-cyan-300">{result.subtitle}</span>
                                <span className="text-[9px] text-fuchsia-300 font-semibold uppercase">{result.source}</span>
                              </div>
                              {result.meta && (
                                <span className="text-[9px] text-zinc-500 truncate mt-0.5 font-mono">{result.meta}</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Quick Active States Tracker telemetry */}
          <div className="flex items-center gap-4 bg-purple-950/20 border border-fuchsia-500/20 px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(255,0,171,0.05)]">
            <div className="flex items-center gap-4 text-[10px] font-mono select-none">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-zinc-450 uppercase">WORKSPACE LIVE</span>
              </div>
              <div className="text-pink-300">
                <span className="font-black text-zinc-300">Notes:</span> {scratchpadNotes.length} chars
              </div>
              <div className="text-cyan-300">
                <span className="font-black text-zinc-300">Helper:</span> {notesChatHistory.length} logs
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Workspace Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
        
        {/* Helper notifications area */}
        {alertInfo && (
          <div className="col-span-1 lg:col-span-5 relative z-30">
            <div className={`p-4 rounded-xl text-xs flex items-start justify-between gap-2.5 border transition-all shadow-[0_0_15px_rgba(255,10,180,0.15)] ${
              alertInfo.type === "error" 
                ? "bg-rose-950/50 border-rose-500/30 text-rose-300"
                : "bg-fuchsia-950/50 border-pink-500/30 text-pink-300"
            }`}>
              <div className="flex items-start gap-2.5">
                <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${alertInfo.type === "error" ? "text-rose-450" : "text-pink-400"}`} />
                <div>
                  <p className="font-bold">{alertInfo.type === "error" ? "System Notification" : "Companion Tip"}</p>
                  <p className="mt-0.5 text-zinc-200 font-sans">{alertInfo.message}</p>
                </div>
              </div>
              <button onClick={() => setAlertInfo(null)} className="text-zinc-400 hover:text-white pb-1 select-none">
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* --- LEFT AREA: PRIMARY AI CHAT WORKSPACE (Takes 3/5 width) --- */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-4 h-[750px] lg:h-[820px] bg-[#0c0524]/60 border border-purple-500/10 rounded-2xl p-5 shadow-[0_0_25px_rgba(255,0,171,0.02)] backdrop-blur-md">
          
          {/* Header section with green status dot */}
          <div className="flex items-center justify-between border-b border-purple-500/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-7 h-7 bg-pink-950/40 rounded-xl border border-pink-500/30 flex items-center justify-center text-pink-400">
                  <Terminal className="w-3.5 h-3.5 text-pink-400" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-black animate-ping" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-black" />
              </div>
              <div>
                <span className="text-[10px] text-pink-400 font-extrabold uppercase tracking-widest leading-none block">Primary Chat Space</span>
                <h3 className="text-sm font-black text-white leading-tight mt-0.5 uppercase tracking-wide font-display">Intellectual Conversationalist</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearPrimaryChat}
                title="Clear chat history instantly"
                className="p-1 px-3 rounded-xl border border-pink-500/15 hover:bg-pink-950/20 text-pink-300 hover:border-pink-500/40 text-2xs cursor-pointer tracking-wider font-bold uppercase transition-all"
              >
                Clear Chat History
              </button>
            </div>
          </div>

          {/* Quick Learning Personas and Behaviors */}
          <div className="flex flex-col gap-1.5 bg-[#13072f]/40 p-3 rounded-xl border border-purple-500/10">
            <div className="text-[9px] text-zinc-400 font-black mb-1 flex items-center justify-between uppercase tracking-widest font-mono">
              <span>Quick Learning Modes & Starter Behaviors</span>
              <SlidersHorizontal className="w-3 h-3 text-pink-500/70" />
            </div>
            
            <div className="grid grid-cols-2 gap-1.5 font-sans">
              {PROMPT_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => loadPromptBehavior(tmpl)}
                  className="text-left p-1.5 rounded-lg border border-pink-500/10 bg-[#060211] hover:bg-pink-950/25 hover:border-pink-500/30 transition-all cursor-pointer"
                >
                  <p className="text-[10px] font-bold text-pink-200 truncate uppercase leading-tight font-display">{tmpl.title.replace("AI Study ", "").replace("Client Workflow ", "").replace("Objection Mock ", "").replace("Master", "Advanced")}</p>
                  <p className="text-[9px] text-zinc-500 truncate mt-0.5 leading-none">{tmpl.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Current System Instructions custom prompt label */}
          <div className="bg-black/40 px-3 py-1.5 rounded-lg border border-indigo-500/10 flex items-center gap-3 text-[9px] text-zinc-400 font-mono">
            <span className="text-pink-400 font-extrabold uppercase">SYSTEM TARGET:</span>
            <span className="truncate flex-1 font-semibold">{chatSystemInstruction}</span>
            <button 
              type="button"
              onClick={() => {
                setPersonaDraft(chatSystemInstruction);
                setIsPersonaOpen(true);
              }}
              className="text-pink-400 hover:text-white hover:underline shrink-0 cursor-pointer font-bold uppercase text-[9px] bg-pink-500/10 hover:bg-pink-500/20 px-2 py-0.5 rounded border border-pink-500/20 transition-all font-mono"
            >
              Change Persona
            </button>
          </div>

          {/* Scrollable messages panel */}
          <div ref={primaryScrollContainerRef} className="flex-1 overflow-y-auto px-1 space-y-4 flex flex-col scrollbar-thin scrollbar-thumb-purple-900 scroll-smooth">
            {chatHistory.map((msg) => {
              const isAi = msg.role === "assistant";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] gap-1 ${
                    isAi ? "self-start" : "self-end items-end"
                  }`}
                >
                  <span className="text-[9px] text-zinc-500 px-1 font-sans">
                    {isAi ? "🤖 Workspace Assistant" : "👤 Me"} • {msg.timestamp}
                  </span>
                  <div
                    className={`rounded-2xl p-3 text-xs leading-relaxed ${
                      isAi
                        ? "bg-gradient-to-br from-[#120732] to-[#08021c] text-zinc-200 border border-purple-500/15 shadow-[0_4px_12px_rgba(0,0,0,0.5)] rounded-bl-none"
                        : "bg-gradient-to-br from-pink-500 to-purple-600 text-white font-semibold rounded-br-none shadow-[0_0_12px_rgba(236,72,153,0.3)]"
                    }`}
                  >
                    <div className="space-y-2 font-sans font-normal">
                      {isAi ? renderMarkdown(msg.text) : msg.text}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {isChatLoading && (
              <div className="self-start flex flex-col max-w-[85%] gap-1">
                <span className="text-[9px] text-zinc-500 px-1">🤖 Thinking...</span>
                <div className="rounded-2xl p-3 text-xs bg-purple-950/20 border border-purple-500/10 rounded-bl-none flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping inline-block" />
                  <span className="text-zinc-400">Evaluating multi-vector parameters...</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom write field submission console */}
          <div className="border-t border-purple-500/10 pt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask the Primary AI Buddy literally anything..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendChatMessage();
                }}
                disabled={isChatLoading}
                className="w-full bg-[#050110]/95 border border-purple-500/20 rounded-xl py-3 pl-4 pr-12 text-xs text-zinc-150 placeholder-zinc-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500/30 transition-all font-semibold disabled:opacity-50 shadow-[0_0_15px_rgba(0,0,0,0.7)]"
              />
              <button
                type="button"
                onClick={() => sendChatMessage()}
                disabled={isChatLoading || !chatInput.trim()}
                className="absolute inset-y-1.5 right-1.5 p-2 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/35 hover:bg-pink-500 hover:text-white hover:border-transparent transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[9px] text-center text-zinc-650 mt-1.5 select-none tracking-wide">
              Secure full-stack node gateway • Powered securely by Gemini 3.5 Flash Model
            </p>
          </div>

        </div>

        {/* --- RIGHT AREA: DEDICATED AI STUDY NOTEBOOK & ASSISTANT (Takes 2/5 width) --- */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-4 h-[750px] lg:h-[820px]">
          
          {/* Active Work Scratchpad Notebook */}
          <div className="flex-1 flex flex-col gap-3.5 bg-[#07021a]/65 border border-cyan-500/15 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,240,255,0.01)] backdrop-blur-md">
            
            <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2">
              <div className="flex items-center gap-2">
                <Notebook className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-xs font-black text-white tracking-widest uppercase">My Active Scratchpad</span>
              </div>
              <span className="text-[9px] font-bold text-cyan-400 bg-cyan-950/20 border border-cyan-500/20 px-1.5 py-0.5 rounded uppercase font-mono tracking-wider">
                System Autosaves
              </span>
            </div>

            <textarea
              value={scratchpadNotes}
              onChange={(e) => setScratchpadNotes(e.target.value)}
              placeholder="Draft tricky points, outline lessons, copy codes, or brainstorm here. Your dedicated AI Notes Assistant underneath will help deconstruct, style, expand, or build comprehensive quizzing on demand based strictly on this text..."
              className="flex-1 w-full bg-[#03010b]/90 border border-cyan-500/10 rounded-xl p-3 text-xs text-zinc-200 placeholder-zinc-650 resize-none font-mono focus:outline-none focus:border-cyan-500/40 focus:ring-0 leading-relaxed font-normal shadow-inner"
            />

            <div className="flex items-center justify-between text-[10px] text-zinc-500 border-t border-purple-500/5 pt-2">
              <span>Characters: <strong className="font-bold text-zinc-300 font-mono">{scratchpadNotes.length}</strong></span>
              {resetConfirmStep ? (
                <div className="flex items-center gap-1.5 select-none text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      setScratchpadNotes("");
                      setResetConfirmStep(false);
                      setAlertInfo({ type: "info", message: "Scratchpad note contents cleared successfully!" });
                    }}
                    className="text-red-400 hover:text-red-300 font-extrabold uppercase cursor-pointer animate-pulse"
                  >
                    ⚠️ Click Again to Clear
                  </button>
                  <span className="text-zinc-700">|</span>
                  <button
                    type="button"
                    onClick={() => setResetConfirmStep(false)}
                    className="text-zinc-550 hover:text-zinc-300 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button 
                  type="button"
                  onClick={() => setResetConfirmStep(true)}
                  className="text-zinc-500 hover:text-white transition-all text-2xs cursor-pointer select-none uppercase font-bold"
                >
                  Reset Note
                </button>
              )}
            </div>
          </div>

          {/* Quick Note Helper Actions Hub */}
          <div className="bg-[#0b031f]/70 border border-purple-500/10 rounded-xl p-2.5 flex flex-col gap-2">
            <div className="text-[9px] text-cyan-400 font-black uppercase tracking-wider pl-1 select-none">
              Notes Quick-Assistant Commands
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-sans">
              <button
                type="button"
                onClick={triggerNoteSummary}
                className="py-1.5 px-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-550/20 text-cyan-300 border border-cyan-550/25 rounded-md text-[10px] font-black transition-all cursor-pointer uppercase flex items-center justify-center gap-1 shrink-0"
              >
                <span>🪄 Summarize</span>
              </button>
              <button
                type="button"
                onClick={triggerNoteQuiz}
                className="py-1.5 px-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-purple-300 border border-purple-550/25 rounded-md text-[10px] font-black transition-all cursor-pointer uppercase flex items-center justify-center gap-1 shrink-0"
              >
                <span>❓ Quiz Me</span>
              </button>
              <button
                type="button"
                onClick={triggerNoteExpanding}
                className="py-1.5 px-2 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 hover:from-teal-500/20 hover:to-emerald-500/20 text-teal-300 border border-teal-550/25 rounded-md text-[10px] font-black transition-all cursor-pointer uppercase flex items-center justify-center gap-1 shrink-0"
              >
                <span>✨ Style / Expand</span>
              </button>
              <button
                type="button"
                onClick={triggerFlashcardGeneration}
                className="py-1.5 px-2 bg-[#120b2e] hover:bg-purple-950/30 text-pink-300 border border-pink-500/20 rounded-md text-[10px] font-black transition-all cursor-pointer uppercase flex items-center justify-center gap-1 shrink-0"
              >
                <span>📝 Flashcards</span>
              </button>
            </div>
          </div>

          {/* Separate Notes Assistant Chat history */}
          <div className="h-[280px] bg-[#050117]/85 border border-cyan-500/15 rounded-2xl p-4 flex flex-col gap-3 shadow-[0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-md">
            
            <div className="flex items-center justify-between border-b border-purple-500/10 pb-2">
              <div className="flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-cyan-400 shrink-0 animate-bounce" />
                <h4 className="text-3sm font-black text-white uppercase tracking-wider font-display">Notes AI Companion</h4>
              </div>
              <button
                onClick={clearNotesChat}
                className="text-[9px] font-bold text-zinc-450 hover:text-white transition-all cursor-pointer select-none"
              >
                Clear History
              </button>
            </div>

            {/* Conversation list */}
            <div ref={notesScrollContainerRef} className="flex-1 overflow-y-auto space-y-3 px-1 scrollbar-thin flex flex-col scroll-smooth">
              {notesChatHistory.map((msg) => {
                const isAi = msg.role === "assistant";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[90%] gap-0.5 ${
                      isAi ? "self-start" : "self-end items-end"
                    }`}
                  >
                    <span className="text-[8px] text-zinc-550 font-semibold px-1 font-mono">
                      {isAi ? "📝 Note Helper" : "👤 Student"}
                    </span>
                    <div
                      className={`rounded-2xl p-2.5 text-[11px] leading-relaxed ${
                        isAi
                          ? "bg-cyan-950/20 text-zinc-350 border border-cyan-500/10 rounded-bl-none shadow"
                          : "bg-cyan-650/40 text-cyan-100 border border-cyan-500/30 rounded-br-none"
                      }`}
                    >
                      <div className="space-y-1.5">
                        {isAi ? renderMarkdown(msg.text) : msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {isNotesChatLoading && (
                <div className="self-start flex flex-col max-w-[90%] gap-0.5 animate-pulse">
                  <span className="text-[8px] text-zinc-550 font-mono">📝 Note Helper is reading scratchpad...</span>
                  <div className="rounded-2xl p-2.5 text-[11px] bg-cyan-950/10 border border-cyan-500/5 rounded-bl-none text-zinc-400">
                    Formatting markdown blocks...
                  </div>
                </div>
              )}
            </div>

            {/* Notebook chat write panel */}
            <div className="border-t border-purple-500/5 pt-2 flex gap-2">
              <input
                type="text"
                placeholder="Ask helper about active notes..."
                value={notesChatInput}
                onChange={(e) => setNotesChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendNotesChatMessage();
                }}
                disabled={isNotesChatLoading}
                className="flex-1 bg-[#020006]/90 border border-cyan-550/15 rounded-xl py-2 px-3 text-[11px] text-zinc-200 placeholder-zinc-550 focus:outline-none focus:border-cyan-450 transition-all font-semibold"
              />
              <button
                type="button"
                onClick={() => sendNotesChatMessage()}
                disabled={isNotesChatLoading || !notesChatInput.trim()}
                className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/35 hover:bg-cyan-400 hover:text-black hover:border-transparent transition-all cursor-pointer font-bold disabled:opacity-30 disabled:pointer-events-none shrink-0"
              >
                <Send className="w-3 h-3 text-cyan-300 hover:text-black" />
              </button>
            </div>

          </div>

        </div>

      </main>
        {/* Detail view modal for global searches */}
      {selectedOnlineItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div 
            className="fixed inset-0"
            onClick={() => setSelectedOnlineItem(null)}
          />
          <div className="relative w-full max-w-xl bg-gradient-to-br from-[#0a0524] to-[#010006] border border-cyan-500/30 rounded-2xl shadow-[0_0_45px_rgba(0,240,255,0.25)] p-6 z-10 flex flex-col gap-5 overflow-hidden">
            {/* Ambient visual overlay */}
            <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[9px] font-black px-2 py-0.5 bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 rounded uppercase tracking-widest">
                  {selectedOnlineItem.badge} • Global Verification
                </span>
                <h2 className="text-lg font-black tracking-tight text-white mt-1.5 font-display uppercase">
                  {selectedOnlineItem.title}
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Reputable Host: <span className="text-cyan-300 font-bold">{selectedOnlineItem.subtitle}</span> ({selectedOnlineItem.source})
                </p>
              </div>
              <button 
                onClick={() => setSelectedOnlineItem(null)}
                className="p-1.5 rounded-lg bg-[#0e072a] text-zinc-400 hover:text-white border border-purple-500/10 hover:border-purple-500/30 cursor-pointer self-start shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#050114]/80 border border-purple-500/10 rounded-xl p-4 flex flex-col gap-3 font-sans">
              <div className="flex justify-between items-center text-xs border-b border-purple-500/10 pb-2 font-mono text-[11px]">
                <span className="text-zinc-500">Estimated Duration & Scope:</span>
                <span className="text-cyan-300 font-bold">{selectedOnlineItem.meta}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">Professional Curriculum Alignment:</span>
                <p className="text-xs text-zinc-350 leading-relaxed font-normal whitespace-pre-wrap">
                  {selectedOnlineItem.additionalInfo}
                </p>
              </div>
            </div>

            <div className="flex gap-2.5 justify-end mt-2 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  const importedContent = `### ${selectedOnlineItem.title}\n- **Source/Platform:** ${selectedOnlineItem.subtitle} (${selectedOnlineItem.source})\n- **Info:** ${selectedOnlineItem.meta}\n- **Skills/Takeaway Overview:**\n  ${selectedOnlineItem.additionalInfo}\n\n`;
                  setScratchpadNotes(prev => importedContent + prev);
                  setAlertInfo({ type: "info", message: `Successfully saved "${selectedOnlineItem.title}" facts into your active study notepad!` });
                  setSelectedOnlineItem(null);
                }}
                className="px-4 py-2.5 bg-zinc-950/80 hover:bg-zinc-900 border border-purple-500/15 text-zinc-350 hover:text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 justify-center"
              >
                <Bookmark className="w-3.5 h-3.5 text-zinc-400" />
                <span>Save to Notes</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const socraticPrompt = `Act as an expert instructor in Socratic learning mode. I am investigating this material: "${selectedOnlineItem.title}" provided by ${selectedOnlineItem.subtitle}. Can we run an interactive study session where you deconstruct its core competencies? Ask me one challenging question based on this description:\n\n${selectedOnlineItem.additionalInfo}`;
                  setChatSystemInstruction("You are a warm, supportive, and brilliant Socratic study tutor who deconstructs certifications, skills, and syllabus structures using targeted educational questions.");
                  sendChatMessage(socraticPrompt);
                  setSelectedOnlineItem(null);
                  setSearchQuery("");
                  setIsSearchFocused(false);
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white text-xs font-black rounded-xl shadow-[0_4px_15px_rgba(255,0,171,0.2)] transition-all cursor-pointer flex items-center gap-1.5 justify-center"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-200" />
                <span>Discuss in Workspace AI</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MindQuest Custom Persona selector modal */}
      {isPersonaOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div 
            className="fixed inset-0"
            onClick={() => setIsPersonaOpen(false)}
          />
          <div className="relative w-full max-w-xl bg-gradient-to-br from-[#0e072c] to-[#040114] border border-pink-500/35 rounded-2xl shadow-[0_0_55px_rgba(255,0,171,0.2)] p-6 z-10 flex flex-col gap-4 overflow-hidden font-sans">
            {/* Soft pink neon decor */}
            <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[9px] font-bold px-2 py-0.5 bg-pink-500/15 border border-pink-500/30 text-pink-300 rounded uppercase tracking-wider">
                  MindQuest Customization Console
                </span>
                <h2 className="text-lg font-bold font-display text-white mt-1.5 leading-snug uppercase tracking-wide">
                  Choose MindQuest's Persona
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Change how the main AI companion operates, responds, and tutors you!
                </p>
              </div>
              <button 
                onClick={() => setIsPersonaOpen(false)}
                className="p-1.5 rounded-lg bg-[#0e072a] text-zinc-400 hover:text-white border border-purple-500/10 hover:border-purple-500/30 cursor-pointer self-start shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Persona Preset Options list */}
            <div className="flex flex-col gap-2 max-h-[290px] overflow-y-auto pr-1">
              <span className="text-[9px] font-black text-pink-400 uppercase tracking-widest pl-0.5">
                Preset Character Blueprints:
              </span>
              <div className="grid grid-cols-1 gap-2">
                {PERSONA_PRESETS.map((preset, idx) => {
                  const isActive = chatSystemInstruction === preset.prompt;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setChatSystemInstruction(preset.prompt);
                        setPersonaDraft(preset.prompt);
                        setAlertInfo({ type: "info", message: `MindQuest Companion Persona successfully updated!` });
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex justify-between items-center ${
                        isActive
                          ? "bg-pink-500/10 border-pink-500/50 shadow-[0_0_12px_rgba(255,0,171,0.15)]"
                          : "bg-black/40 border-purple-500/15 hover:border-pink-500/25 hover:bg-purple-950/15"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm shrink-0">{preset.name.split(" ")[0]}</span>
                          <span className={`text-xs font-bold ${isActive ? "text-pink-300" : "text-white"}`}>
                            {preset.name.split(" ").slice(1).join(" ")}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-0.5 leading-tight">{preset.tagline}</p>
                      </div>
                      {isActive && <Check className="w-3.5 h-3.5 text-pink-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Instruction Edit Textbox */}
            <div className="bg-[#050114]/85 border border-purple-500/15 rounded-xl p-3 flex flex-col gap-1.5 font-sans">
              <div className="flex justify-between items-center text-[9px] uppercase font-bold text-cyan-300 font-mono">
                <span>Or Craft Custom Prompt Guidelines Manually:</span>
                <span className="text-zinc-600">system rule definition</span>
              </div>
              <textarea
                value={personaDraft}
                onChange={(e) => setPersonaDraft(e.target.value)}
                rows={3}
                placeholder="Instruct MindQuest to speak like a pirate, a medieval knight, a grumpy robot, or whatever you want..."
                className="w-full bg-black/60 border border-purple-500/25 rounded-lg p-2 text-xs text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-pink-500 font-sans"
              />
            </div>

            <div className="flex gap-2 justify-end mt-1">
              <button
                type="button"
                onClick={() => setIsPersonaOpen(false)}
                className="px-4 py-2 bg-transparent hover:bg-zinc-900 border border-transparent hover:border-zinc-800 text-zinc-450 hover:text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (personaDraft.trim()) {
                    setChatSystemInstruction(personaDraft.trim());
                    setAlertInfo({ type: "info", message: "Successfully applied your custom MindQuest system instruction!" });
                    setIsPersonaOpen(false);
                  }
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white text-xs font-black rounded-xl shadow-[0_4px_15px_rgba(255,0,171,0.2)] transition-all cursor-pointer"
              >
                Save & Apply Persona
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Simple Professional footer */}
      <footer className="border-t border-purple-500/5 mt-10 py-5 bg-[#010005] relative z-20">
        <p className="text-center text-[10px] text-zinc-600 font-mono tracking-widest select-none uppercase">
          MindQuest AI Playground & Notes Sandbox Edition • Secured Gateway Proxy Ready
        </p>
      </footer>

    </div>
  );
}
