export const CATEGORIES = [
  'Languages',
  'Full Stack',
  'Databases',
  'Cloud & DevOps',
  'Applied AI',
];

export const SKILLS = [
  // Languages
  { id: 'javascript', name: 'JavaScript', category: 'Languages',      icon: { type: 'si', ref: 'SiJavascript' }, color: '#F7DF1E' },
  { id: 'typescript', name: 'TypeScript', category: 'Languages',      icon: { type: 'si', ref: 'SiTypescript' }, color: '#3178C6' },
  { id: 'html',       name: 'HTML',       category: 'Languages',      icon: { type: 'si', ref: 'SiHtml5'      }, color: '#E34F26' },
  { id: 'css',        name: 'CSS',        category: 'Languages',      icon: { type: 'si', ref: 'SiCss'        }, color: '#1572B6' },
  { id: 'sql',        name: 'SQL',        category: 'Languages',      icon: { type: 'custom', ref: 'SqlIcon'  }, color: '#336791' },
  { id: 'java',       name: 'Java',       category: 'Languages',      icon: { type: 'custom', ref: 'JavaIcon' }, color: '#F89820' },
  // Full Stack
  { id: 'react',     name: 'React',       category: 'Full Stack',     icon: { type: 'si', ref: 'SiReact'       }, color: '#61DAFB' },
  { id: 'nextjs',    name: 'Next.js',     category: 'Full Stack',     icon: { type: 'si', ref: 'SiNextdotjs'   }, color: '#FFFFFF' },
  { id: 'tailwind',  name: 'Tailwind',    category: 'Full Stack',     icon: { type: 'si', ref: 'SiTailwindcss' }, color: '#06B6D4' },
  { id: 'nodejs',    name: 'Node.js',     category: 'Full Stack',     icon: { type: 'si', ref: 'SiNodedotjs'   }, color: '#5FA04E' },
  { id: 'expressjs', name: 'Express.js',  category: 'Full Stack',     icon: { type: 'si', ref: 'SiExpress'     }, color: '#AAAAAA' },
  { id: 'restapis',  name: 'REST APIs',   category: 'Full Stack',     icon: { type: 'custom', ref: 'ApiIcon'   }, color: '#A89BF2' },
  { id: 'github',    name: 'GitHub',      category: 'Full Stack',     icon: { type: 'si', ref: 'SiGithub'      }, color: '#FFFFFF' },
  { id: 'postman',   name: 'Postman',     category: 'Full Stack',     icon: { type: 'si', ref: 'SiPostman'     }, color: '#FF6C37' },
  // Databases
  { id: 'mongodb',    name: 'MongoDB',    category: 'Databases',      icon: { type: 'si', ref: 'SiMongodb'    }, color: '#47A248' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Databases',      icon: { type: 'si', ref: 'SiPostgresql' }, color: '#4169E1' },
  { id: 'mysql',      name: 'MySQL',      category: 'Databases',      icon: { type: 'si', ref: 'SiMysql'      }, color: '#4479A1' },
  { id: 'redis',      name: 'Redis',      category: 'Databases',      icon: { type: 'si', ref: 'SiRedis'      }, color: '#FF4438' },
  { id: 'pinecone',   name: 'Pinecone',   category: 'Databases',      icon: { type: 'custom', ref: 'PineconeIcon' }, color: '#00D4AA' },
  // Cloud & DevOps
  { id: 'docker', name: 'Docker', category: 'Cloud & DevOps', icon: { type: 'si', ref: 'SiDocker'       }, color: '#2496ED' },
  { id: 'aws',    name: 'AWS',    category: 'Cloud & DevOps', icon: { type: 'custom', ref: 'AwsIcon'    }, color: '#FF9900' },
  // Applied AI — SkillBadge treatment unchanged
  { id: 'langchain',  name: 'LangChain',         category: 'Applied AI', icon: { type: 'si',     ref: 'SiLangchain'  } },
  { id: 'langgraph',  name: 'LangGraph',         category: 'Applied AI', icon: { type: 'si',     ref: 'SiLanggraph'  } },
  { id: 'rag',        name: 'RAG',               category: 'Applied AI', icon: { type: 'mono',   ref: 'RAG'          } },
  { id: 'vectoremb',  name: 'Vector Embeddings', category: 'Applied AI', icon: { type: 'lucide', ref: 'Layers'       } },
  { id: 'llmint',     name: 'LLM Integration',   category: 'Applied AI', icon: { type: 'lucide', ref: 'Cpu'          } },
  { id: 'aiorch',     name: 'AI Orchestration',  category: 'Applied AI', icon: { type: 'lucide', ref: 'Workflow'     } },
];
