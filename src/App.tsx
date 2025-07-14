
import { useState } from 'react';
import { AlertCircle, Book, Compass, Lightbulb, Search } from 'lucide-react';

function App() {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(null);
  const [activeModule, setActiveModule] = useState(0);

  //@ts-ignore
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call to generate content
    setTimeout(() => {
      const generatedContent = generateContent(topic);
      //@ts-ignore
      setContent(generatedContent);
      setIsLoading(false);
    }, 1500);
  };

  const generateContent = (topic:any) => {
    // This would be replaced with an actual API call
    // For demo purposes, generate dummy content based on the topic
    const modules = [
      {
        title: `Introduction to ${topic}`,
        chapters: [
          { title: `What is ${topic}?`, content: `${topic} is a fundamental concept in computer science that...` },
          { title: `History of ${topic}`, content: `The evolution of ${topic} began in the early days of computing when...` },
          { title: `Why study ${topic}?`, content: `Understanding ${topic} is crucial for several reasons...` }
        ]
      },
      {
        title: `Core Concepts of ${topic}`,
        chapters: [
          { title: `Key principles`, content: `The main principles that govern ${topic} include...` },
          { title: `Important terminology`, content: `When working with ${topic}, you'll encounter these important terms...` },
          { title: `Common patterns`, content: `Several patterns emerge when studying ${topic} in depth...` }
        ]
      },
      {
        title: `Advanced ${topic}`,
        chapters: [
          { title: `Advanced techniques`, content: `Once you master the basics, you can explore these advanced techniques...` },
          { title: `Real-world applications`, content: `${topic} is used in industry to solve problems such as...` },
          { title: `Future directions`, content: `The field of ${topic} is evolving in these exciting ways...` }
        ]
      }
    ];
    
    return modules;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-3">
      <header className="p-6 bg-neutral-900/90 backdrop-blur-xl shadow-sm max-w-[80%] mx-auto rounded-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between ">
          <div className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-indigo-600">LearnGen</h1>
          </div>
          <nav className="hidden md:flex items-center  space-x-6 ">
            <a href="#" className="text-white hover:text-indigo-600 font-medium">Home</a>
            <a href="#" className="text-white hover:text-indigo-600 font-medium">Library</a>
            <a href="#" className="text-white hover:text-indigo-600 font-medium">About</a>
            <a href="#" className="text-white hover:text-indigo-600 font-medium">Contact</a>
          </nav>
          <button className="md:hidden text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <section className="mb-12 mt-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Learn Any Programming Topic
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Enter any programming concept or technology, and we'll generate personalized learning modules to help you master it.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic (e.g., React Hooks, GraphQL, Data Structures)"
                className="w-full p-4 pr-12 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
                disabled={isLoading}
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
        </section>

        {isLoading && (
          <div className="flex flex-col items-center justify-center my-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">Generating your personalized learning plan...</p>
          </div>
        )}

        {content && !isLoading && (
          <div className="grid md:grid-cols-12 gap-6 mt-8">
            <div className="md:col-span-4 lg:col-span-3 bg-white rounded-xl shadow-md p-4 h-fit">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Compass className="h-5 w-5 mr-2 text-indigo-600" />
                Learning Path
              </h3>
              <ul className="space-y-1">
                
                {(content as any).map((module:any, moduleIndex:any) => (
                  <li key={moduleIndex}>
                    <button
                      onClick={() => setActiveModule(moduleIndex)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeModule === moduleIndex
                          ? 'bg-indigo-100 text-indigo-700 font-medium'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {module.title}
                    </button>
                    {activeModule === moduleIndex && (
                      <ul className="ml-4 mt-2 space-y-1 border-l-2 border-indigo-200 pl-4">
                        {module.chapters.map((chapter:any, chapterIndex:any) => (
                          <li key={chapterIndex}>
                            <a href={`#chapter-${moduleIndex}-${chapterIndex}`} className="block py-1 text-sm text-gray-600 hover:text-indigo-600">
                              {chapter.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-8 lg:col-span-9">
              {(content[activeModule] as any).chapters.map((chapter:any, chapterIndex:any) => (
                <div 
                  key={chapterIndex} 
                  id={`chapter-${activeModule}-${chapterIndex}`}
                  className="bg-white rounded-xl shadow-md p-6 mb-6"
                >
                  <div className="flex items-start mb-4">
                    <div className="bg-indigo-100 rounded-full p-2 mr-4">
                      <Lightbulb className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{chapter.title}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{chapter.content}</p>
                  
                  <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800">Key Insight</h4>
                        <p className="text-amber-700 text-sm mt-1">
                          When working with {topic} in this context, remember that organizing your approach will lead to more maintainable code.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between mt-6">
                <button 
                  onClick={() => setActiveModule(Math.max(0, activeModule - 1))}
                  disabled={activeModule === 0}
                  className={`px-4 py-2 rounded-lg border border-indigo-600 ${
                    activeModule === 0 
                      ? 'text-gray-400 border-gray-300 cursor-not-allowed' 
                      : 'text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  Previous Module
                </button>
                <button 
                //@ts-ignore
                  onClick={() => setActiveModule(Math.min(content.length - 1, activeModule + 1))}
                  // @ts-ignore
                  disabled={activeModule === content.length - 1}
                  
                  className={`px-4 py-2 rounded-lg bg-indigo-600 text-white ${
                    activeModule === (content as any).length - 1 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'hover:bg-indigo-700'
                  }`} 
                >
                  Next Module
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <Book className="h-6 w-6 text-indigo-400 mr-2" />
                <span className="font-bold text-xl">LearnGen</span>
              </div>
              <p className="text-gray-400 mt-2 text-sm">
                Your personalized learning companion
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div>
                <h3 className="font-medium mb-2">Platform</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li><a href="#" className="hover:text-indigo-400">Home</a></li>
                  <li><a href="#" className="hover:text-indigo-400">Features</a></li>
                  <li><a href="#" className="hover:text-indigo-400">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Resources</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li><a href="#" className="hover:text-indigo-400">Documentation</a></li>
                  <li><a href="#" className="hover:text-indigo-400">Tutorials</a></li>
                  <li><a href="#" className="hover:text-indigo-400">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Company</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li><a href="#" className="hover:text-indigo-400">About</a></li>
                  <li><a href="#" className="hover:text-indigo-400">Careers</a></li>
                  <li><a href="#" className="hover:text-indigo-400">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Legal</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li><a href="#" className="hover:text-indigo-400">Privacy</a></li>
                  <li><a href="#" className="hover:text-indigo-400">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} LearnGen. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;