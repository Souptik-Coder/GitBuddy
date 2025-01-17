import React, { useState } from 'react';
import { Copy, Check, Search, Edit2, X } from 'lucide-react';

const GitCommands = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCommand, setCopiedCommand] = useState(null);
  const [editableValues, setEditableValues] = useState({});
  const [editingCommand, setEditingCommand] = useState(null);

  const commands = [
    {
      category: 'Basic Commands',
      items: [
        {
          name: 'Initialize Repository',
          command: 'git init',
          description: 'Create an empty Git repository or reinitialize an existing one',
        },
        {
          name: 'Stage Changes',
          command: 'git add <file-name>',
          description: 'Add file contents to the staging area',
          editable: true,
          placeholder: 'file-name',
        },
        {
          name: 'Stage All Changes',
          command: 'git add .',
          description: 'Add all modified and new files to the staging area',
        },
        {
          name: 'Commit Changes',
          command: 'git commit -m "<message>"',
          description: 'Record changes to the repository',
          editable: true,
          placeholder: 'commit message',
        },
        {
          name: 'Amend Last Commit',
          command: 'git commit --amend -m "<new-message>"',
          description: 'Modify the last commit with new changes and/or message',
          editable: true,
          placeholder: 'new message',
        },
        {
          name: 'View Status',
          command: 'git status',
          description: 'Show the status of working directory and staging area',
        },
      ],
    },
    {
      category: 'Branch Operations',
      items: [
        {
          name: 'List Branches',
          command: 'git branch',
          description: 'List all local branches',
        },
        {
          name: 'Create Branch',
          command: 'git branch <branch-name>',
          description: 'Create a new branch',
          editable: true,
          placeholder: 'branch-name',
        },
        {
          name: 'Switch Branch',
          command: 'git checkout <branch-name>',
          description: 'Switch to a different branch',
          editable: true,
          placeholder: 'branch-name',
        },
        {
          name: 'Create & Switch Branch',
          command: 'git checkout -b <branch-name>',
          description: 'Create a new branch and switch to it',
          editable: true,
          placeholder: 'branch-name',
        },
        {
          name: 'Delete Branch',
          command: 'git branch -d <branch-name>',
          description: 'Delete a branch',
          editable: true,
          placeholder: 'branch-name',
        },
        {
          name: 'Rename Branch',
          command: 'git branch -m <new-branch-name>',
          description: 'Rename the current branch',
          editable: true,
          placeholder: 'new-branch-name',
        },
      ],
    },
    {
      category: 'Remote Operations',
      items: [
        {
          name: 'Add Remote',
          command: 'git remote add <remote-name> <repository-url>',
          description: 'Add a new remote repository',
          editable: true,
          placeholder: 'remote-name repository-url',
        },
        {
          name: 'Set Upstream URL',
          command: 'git remote set-url <remote-name> <new-url>',
          description: 'Change the URL of an existing remote',
          editable: true,
          placeholder: 'remote-name new-url',
        },
        {
          name: 'Push Changes',
          command: 'git push <remote-name> <branch-name>',
          description: 'Upload local repository content to a remote repository',
          editable: true,
          placeholder: 'remote-name branch-name',
        },
        {
          name: 'Set Upstream Branch',
          command: 'git push -u <remote-name> <branch-name>',
          description: 'Push and set the upstream branch',
          editable: true,
          placeholder: 'remote-name branch-name',
        },
        {
          name: 'Pull Changes',
          command: 'git pull <remote-name> <branch-name>',
          description: 'Fetch and integrate with another repository or branch',
          editable: true,
          placeholder: 'remote-name branch-name',
        },
        {
          name: 'Remove Remote',
          command: 'git remote remove <remote-name>',
          description: 'Remove a remote repository',
          editable: true,
          placeholder: 'remote-name',
        },
      ],
    },
    {
      category: 'Advanced Operations',
      items: [
        {
          name: 'Interactive Rebase',
          command: 'git rebase -i HEAD~<number>',
          description: 'Interactively rebase the last N commits',
          editable: true,
          placeholder: 'number',
        },
        {
          name: 'Rebase onto Branch',
          command: 'git rebase <branch-name>',
          description: 'Rebase current branch onto another branch',
          editable: true,
          placeholder: 'branch-name',
        },
        {
          name: 'Cherry Pick',
          command: 'git cherry-pick <commit-hash>',
          description: 'Apply changes from a specific commit',
          editable: true,
          placeholder: 'commit-hash',
        },
        {
          name: 'Reset Commit',
          command: 'git reset --soft <commit-hash>',
          description: 'Reset to a specific commit while keeping changes in staging',
          editable: true,
          placeholder: 'commit-hash',
        },
      ],
    },
    {
      category: 'Configuration',
      items: [
        {
          name: 'Set Username',
          command: 'git config --global user.name "<username>"',
          description: 'Set your Git username',
          editable: true,
          placeholder: 'username',
        },
        {
          name: 'Set Email',
          command: 'git config --global user.email "<email>"',
          description: 'Set your Git email',
          editable: true,
          placeholder: 'email',
        },
        {
          name: 'List Configuration',
          command: 'git config --list',
          description: 'Show all configuration settings',
        },
        {
          name: 'Set Default Editor',
          command: 'git config --global core.editor "<editor-name>"',
          description: 'Set the default editor for Git',
          editable: true,
          placeholder: 'editor-name',
        },
      ],
    },
  ];
  

  const handleCopy = async (command, id) => {
    const finalCommand = editableValues[id] 
      ? command.replace(/<[^>]+>/g, editableValues[id])
      : command;
    
    try {
      await navigator.clipboard.writeText(finalCommand);
      setCopiedCommand(id);
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleEdit = (value, id) => {
    setEditableValues(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const toggleEdit = (id) => {
    setEditingCommand(editingCommand === id ? null : id);
  };

  const filteredCommands = commands.map(category => ({
    ...category,
    items: category.items.filter(cmd => 
      cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8">
          Git Buddy
        </h1>
        
        {/* Search Bar */}
        <div className="mb-8 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search commands..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Commands */}
        <div className="space-y-8">
          {filteredCommands.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-semibold text-gray-100 mb-4">{category.category}</h2>
              <div className="grid gap-4 grid-cols-2">
                {category.items.map((cmd, cmdIndex) => {
                  const commandId = `${categoryIndex}-${cmdIndex}`;
                  return (
                    <div key={cmdIndex} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium text-gray-100">{cmd.name}</h3>
                        <div className="flex items-center space-x-2">
                          {cmd.editable && (
                            <button
                              className="text-gray-400 hover:text-blue-400 transition-colors"
                              onClick={() => toggleEdit(commandId)}
                            >
                              {editingCommand === commandId ? (
                                <X className="w-5 h-5" />
                              ) : (
                                <Edit2 className="w-5 h-5" />
                              )}
                            </button>
                          )}
                          <button
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                            onClick={() => handleCopy(cmd.command, commandId)}
                          >
                            {copiedCommand === commandId ? (
                              <Check className="w-5 h-5 text-green-400" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-400 mb-3">{cmd.description}</p>
                      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                        {cmd.editable && editingCommand === commandId ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-300">{cmd.command.split('<')[0]}</span>
                            <input
                              type="text"
                              className="flex-1 px-2 py-1 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
                              placeholder={cmd.placeholder}
                              value={editableValues[commandId] || ''}
                              onChange={(e) => handleEdit(e.target.value, commandId)}
                            />
                            <span className="text-gray-300">{cmd.command.split('>')[1]}</span>
                          </div>
                        ) : (
                          <span className="text-gray-300">
                            {editableValues[commandId] 
                              ? cmd.command.replace(/<[^>]+>/g, editableValues[commandId])
                              : cmd.command}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitCommands;