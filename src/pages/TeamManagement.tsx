import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

// Team member type definition
interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'pending';
  lastActive?: string;
  permissions: string[];
}

// Pending invitation type definition
interface PendingInvitation {
  id: string;
  email: string;
  role: string;
  dateSent: string;
  status: 'pending' | 'expired';
}

const TeamManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('members');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample team members data
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'John Smith',
      role: 'Owner',
      email: 'john.smith@example.com',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=random',
      status: 'active',
      lastActive: '2 hours ago',
      permissions: ['admin', 'edit', 'view'],
    },
    {
      id: '2',
      name: 'Emma Johnson',
      role: 'Manager',
      email: 'emma.johnson@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Johnson&background=random',
      status: 'active',
      lastActive: '5 minutes ago',
      permissions: ['edit', 'view'],
    },
    {
      id: '3',
      name: 'Michael Williams',
      role: 'Analyst',
      email: 'michael.williams@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Williams&background=random',
      status: 'active',
      lastActive: '1 day ago',
      permissions: ['view'],
    },
    {
      id: '4',
      name: 'Sarah Brown',
      role: 'Marketing',
      email: 'sarah.brown@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Brown&background=random',
      status: 'inactive',
      lastActive: '2 weeks ago',
      permissions: ['view'],
    },
  ];

  // Sample pending invitations
  const pendingInvitations: PendingInvitation[] = [
    {
      id: '1',
      email: 'david.jones@example.com',
      role: 'Analyst',
      dateSent: '2023-04-01',
      status: 'pending',
    },
    {
      id: '2',
      email: 'lisa.miller@example.com',
      role: 'Marketing',
      dateSent: '2023-03-28',
      status: 'expired',
    },
  ];

  // Filter team members based on search term
  const filteredTeamMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get status badge
  const getStatusBadge = (status: 'active' | 'inactive' | 'pending') => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Team Management</h1>
        <p className="text-gray-500">Manage your team members and their access permissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Team Members</p>
                <h3 className="text-2xl font-bold mt-1">{teamMembers.length}</h3>
                <p className="text-xs text-gray-500 mt-2">
                  {teamMembers.filter(m => m.status === 'active').length} active members
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <i className="fas fa-users text-blue-500"></i>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Pending Invitations</p>
                <h3 className="text-2xl font-bold mt-1">
                  {pendingInvitations.filter(i => i.status === 'pending').length}
                </h3>
                <p className="text-xs text-gray-500 mt-2">
                  {pendingInvitations.filter(i => i.status === 'expired').length} expired invitations
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <i className="fas fa-envelope text-yellow-500"></i>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">User Roles</p>
                <h3 className="text-2xl font-bold mt-1">4</h3>
                <p className="text-xs text-gray-500 mt-2">Owner, Manager, Analyst, Marketing</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <i className="fas fa-id-badge text-purple-500"></i>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Management Tabs */}
      <Card>
        <Tabs 
          defaultValue="members" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
            <TabsList>
              <TabsTrigger value="members" className="px-4 py-2">
                <i className="fas fa-users mr-2"></i> Team Members
              </TabsTrigger>
              <TabsTrigger value="invitations" className="px-4 py-2">
                <i className="fas fa-envelope mr-2"></i> Invitations
              </TabsTrigger>
              <TabsTrigger value="roles" className="px-4 py-2">
                <i className="fas fa-shield-alt mr-2"></i> Roles & Permissions
              </TabsTrigger>
            </TabsList>
            <Button className="bg-primary text-white">
              <i className="fas fa-plus mr-2"></i> Add Team Member
            </Button>
          </div>

          <TabsContent value="members" className="p-6">
            <div className="mb-4">
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                <Input
                  className="pl-10"
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 text-gray-500 font-medium">Name</th>
                    <th className="text-left p-3 text-gray-500 font-medium">Role</th>
                    <th className="text-left p-3 text-gray-500 font-medium">Status</th>
                    <th className="text-left p-3 text-gray-500 font-medium">Last Active</th>
                    <th className="text-left p-3 text-gray-500 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeamMembers.map(member => (
                    <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">{member.role}</td>
                      <td className="p-3">{getStatusBadge(member.status)}</td>
                      <td className="p-3 text-sm text-gray-500">{member.lastActive}</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary">
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                            <i className="fas fa-trash"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="invitations" className="p-6">
            <div className="mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Send New Invitation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <Input type="email" placeholder="email@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <select className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option value="">Select a role</option>
                        <option value="manager">Manager</option>
                        <option value="analyst">Analyst</option>
                        <option value="marketing">Marketing</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <Button className="bg-primary text-white w-full">
                        <i className="fas fa-paper-plane mr-2"></i> Send Invitation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-lg font-medium mb-4">Pending Invitations</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 text-gray-500 font-medium">Email</th>
                    <th className="text-left p-3 text-gray-500 font-medium">Role</th>
                    <th className="text-left p-3 text-gray-500 font-medium">Date Sent</th>
                    <th className="text-left p-3 text-gray-500 font-medium">Status</th>
                    <th className="text-left p-3 text-gray-500 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingInvitations.map(invitation => (
                    <tr key={invitation.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3">
                        <p className="font-medium">{invitation.email}</p>
                      </td>
                      <td className="p-3">{invitation.role}</td>
                      <td className="p-3 text-sm text-gray-500">{invitation.dateSent}</td>
                      <td className="p-3">
                        {invitation.status === 'pending' ? (
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Expired</Badge>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary">
                            <i className="fas fa-redo"></i>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                            <i className="fas fa-trash"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="roles" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Role Permissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Owner</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Full Access</Badge>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Manage Team</Badge>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Manage Billing</Badge>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Edit All Data</Badge>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">View All Data</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Manager</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Edit All Data</Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">View All Data</Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Export Reports</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Analyst</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">View All Data</Badge>
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Export Reports</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Marketing</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100">Limited Data Access</Badge>
                        <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100">Marketing Reports</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Create New Role</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                      <Input placeholder="e.g. Sales Representative" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" id="view-data" className="mr-2" />
                          <label htmlFor="view-data">View Data</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="edit-data" className="mr-2" />
                          <label htmlFor="edit-data">Edit Data</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="export-reports" className="mr-2" />
                          <label htmlFor="export-reports">Export Reports</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="invite-members" className="mr-2" />
                          <label htmlFor="invite-members">Invite Team Members</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="manage-team" className="mr-2" />
                          <label htmlFor="manage-team">Manage Team</label>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="bg-primary text-white w-full mt-4">
                      Create Role
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default TeamManagement; 