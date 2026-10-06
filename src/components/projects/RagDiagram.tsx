import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUp, Cpu, Database, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const PIPELINE_NODES = [
  {
    id: 1,
    title: '1. File Upload & Text Extraction',
    short: 'Upload & Extract',
    badge: 'Spring Boot + Tika',
    icon: FileUp,
    color: 'from-blue-600 to-blue-500',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-400',
    details:
      'The user uploads a PDF or Word document. Apache Tika reads the file, strips formatting noise, and splits the text into manageable chunks with overlapping boundaries so context is not lost.',
    specs: ['Apache Tika', 'Spring Boot File Upload', 'Text Chunking', 'User ID Tagging'],
  },
  {
    id: 2,
    title: '2. Generating Embeddings',
    short: 'Embeddings',
    badge: 'Gemini API',
    icon: Cpu,
    color: 'from-indigo-600 to-indigo-500',
    borderColor: 'border-indigo-500',
    textColor: 'text-indigo-400',
    details:
      'Each text chunk is converted into vector embeddings using the Gemini Embedding API, capturing the meaning of sentences so they can be matched mathematically.',
    specs: ['Gemini Embeddings', 'Batch Processing', '768-dim Vectors', 'Context Retention'],
  },
  {
    id: 3,
    title: '3. Storing in ChromaDB',
    short: 'ChromaDB Search',
    badge: 'ChromaDB Vector DB',
    icon: Database,
    color: 'from-sky-600 to-sky-500',
    borderColor: 'border-sky-500',
    textColor: 'text-sky-400',
    details:
      'Embeddings are indexed in ChromaDB collections grouped by user. When a query is submitted, ChromaDB runs cosine similarity search to find the most relevant document sections.',
    specs: ['ChromaDB Vector Store', 'Cosine Similarity', 'Fast Search (<140ms)', 'User-Level Isolation'],
  },
  {
    id: 4,
    title: '4. Grounded Answer with Citations',
    short: 'Grounded Answer',
    badge: 'Gemini Pro Prompting',
    icon: CheckCircle2,
    color: 'from-emerald-600 to-emerald-500',
    borderColor: 'border-emerald-500',
    textColor: 'text-emerald-400',
    details:
      'The top matching document chunks are sent to Gemini Pro with the user question. The model is prompted to answer only using the retrieved excerpts and cite which paragraph it referenced.',
    specs: ['Cited Source Sections', 'Factual Answers', 'Strict Context Boundary', 'Readable Markdown'],
  },
];

export function RagDiagram() {
  const [activeNode, setActiveNode] = useState(1);

  const currentNode = PIPELINE_NODES.find((n) => n.id === activeNode) || PIPELINE_NODES[0];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 lg:p-7 backdrop-blur-xl shadow-xl">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-blue-500" />
            <h4 className="font-heading text-lg font-bold text-white tracking-tight">
              RAG Pipeline Architecture
            </h4>
          </div>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">
            AI Report Analyzer // Spring Boot + ChromaDB + Gemini
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-[11px] font-medium text-zinc-300">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>JWT Auth &amp; Per-User Document Isolation</span>
        </div>
      </div>

      {/* Pipeline Visual Flow Nodes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative mb-6">
        {PIPELINE_NODES.map((node, index) => {
          const Icon = node.icon;
          const isSelected = node.id === activeNode;

          return (
            <div key={node.id} className="relative flex flex-col">
              <button
                onClick={() => setActiveNode(node.id)}
                className={`flex flex-col text-left p-3.5 rounded-xl border transition-all duration-200 relative group overflow-hidden ${
                  isSelected
                    ? `${node.borderColor} bg-zinc-800/80 scale-[1.02] shadow-sm`
                    : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-800/40'
                }`}
              >
                {/* Active top bar */}
                {isSelected && (
                  <motion.div
                    layoutId="activeBar"
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${node.color}`}
                  />
                )}

                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${node.color} text-white shadow-sm`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400">Step {node.id}</span>
                </div>

                <div className="font-heading text-xs font-semibold text-zinc-100 group-hover:text-white transition-colors">
                  {node.short}
                </div>
                <div className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">
                  {node.badge}
                </div>
              </button>

              {/* Connecting arrow indicator for desktop */}
              {index < PIPELINE_NODES.length - 1 && (
                <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-zinc-600 pointer-events-none">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Step Deep-Dive Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 lg:p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h5 className={`font-heading font-bold text-sm lg:text-base ${currentNode.textColor}`}>
              {currentNode.title}
            </h5>
            <span className="font-mono text-xs text-zinc-400 bg-zinc-900 px-2.5 py-0.5 rounded-full border border-zinc-800">
              {currentNode.badge}
            </span>
          </div>

          <p className="text-xs lg:text-sm text-zinc-300 leading-relaxed mb-4">
            {currentNode.details}
          </p>

          {/* Technical Specs Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800/80">
            <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 mr-2">
              <Zap className="h-3.5 w-3.5 text-zinc-400" />
              <span>Details:</span>
            </div>
            {currentNode.specs.map((spec) => (
              <span
                key={spec}
                className="rounded-md bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[11px] font-mono text-zinc-300"
              >
                {spec}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
