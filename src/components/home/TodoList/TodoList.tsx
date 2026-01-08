import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChecklist, IconX, IconPlus, IconTrash } from '@tabler/icons-react';
import { cn } from '../../../utils/cn';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  isOpen: boolean;
  onToggle: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ isOpen, onToggle }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Finish the UI for Mune', completed: false },
    { id: '2', text: 'Implement Firebase Authentication (login & signup flow)', completed: false },
    { id: '3', text: 'Style components using TailwindCSS (dark/light themes)', completed: false },
    { id: '4', text: 'Deploy MVP initial to Vercel', completed: false },
    { id: '5', text: 'Configure Redux Toolkit for global state management', completed: false },
    { id: '6', text: 'Configure commit conventions and branching strategy in GitHub', completed: false },
    { id: '7', text: 'Watch videos of Midudev', completed: false },
    { id: '8', text: 'Practice with Three.js', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo.trim(),
          completed: false,
        },
      ]);
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        className={cn(
          'fixed bottom-6 right-6 z-50',
          'w-14 h-14 rounded-full',
          'bg-primary-500 hover:bg-primary-400',
          'text-white shadow-lg shadow-primary-500/50',
          'flex items-center justify-center',
          'transition-all duration-300',
          isOpen && 'bg-error-500 hover:bg-error-400'
        )}
        aria-label={isOpen ? 'Close task list' : 'Open task list'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <IconX size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <IconChecklist size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Todo List Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'fixed right-0 top-0 bottom-0 z-50',
                'w-full sm:w-96 max-w-[90vw]',
                'bg-background-400 border-l border-white/10',
                'backdrop-blur-xl shadow-2xl',
                'flex flex-col'
              )}
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-500/20">
                      <IconChecklist size={24} className="text-primary-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">My Tasks</h2>
                  </div>
                </div>
              </div>

              {/* Todo List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                <AnimatePresence>
                  {todos.map((todo, index) => (
                    <motion.div
                      key={todo.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-xl',
                        'bg-white/5 border border-white/10',
                        'hover:bg-white/10 transition-colors'
                      )}
                    >
                      <button
                        onClick={() => handleToggleTodo(todo.id)}
                        className={cn(
                          'w-5 h-5 rounded border-2 flex-shrink-0',
                          'transition-all duration-200',
                          todo.completed
                            ? 'bg-primary-500 border-primary-500 flex items-center justify-center'
                            : 'border-white/30 hover:border-primary-500/50'
                        )}
                        aria-label={todo.completed ? 'Mark as not completed' : 'Mark as completed'}
                      >
                        {todo.completed && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 text-white"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </motion.svg>
                        )}
                      </button>
                      <span
                        className={cn(
                          'flex-1 text-sm',
                          todo.completed
                            ? 'text-neutral-5 line-through'
                            : 'text-white'
                        )}
                      >
                        {todo.text}
                      </span>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="p-1.5 rounded-lg text-neutral-5 hover:text-error-400 hover:bg-error-500/10 transition-colors"
                        aria-label="Delete task"
                      >
                        <IconTrash size={16} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {todos.length === 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-neutral-5 py-8"
                  >
                    No tasks. Add a new one!
                  </motion.p>
                )}
              </div>

              {/* Add Todo Input */}
              <div className="p-6 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={handleKeyPress}
                      placeholder="Add your task here..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-5 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all"
                  />
                  <button
                    onClick={handleAddTodo}
                    disabled={!newTodo.trim()}
                    className={cn(
                      'px-4 py-2.5 rounded-xl',
                      'bg-primary-500 hover:bg-primary-400 text-white',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      'transition-colors flex items-center justify-center'
                    )}
                    aria-label="Add task"
                  >
                    <IconPlus size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default TodoList;
