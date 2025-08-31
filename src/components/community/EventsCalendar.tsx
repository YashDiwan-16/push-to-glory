import React from 'react';
import { Search, Filter, Calendar, MapPin, Clock, Users } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  type: 'webinar' | 'conference' | 'workshop' | 'meetup';
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: number;
  maxAttendees: number;
  isOnline: boolean;
  isFree: boolean;
  price?: number;
  image: string;
  organizer: string;
}

const EventsCalendar: React.FC = () => {
  const [events] = React.useState<Event[]>([
    {
      id: '1',
      title: 'Algorand DeFi Deep Dive',
      type: 'webinar',
      date: '2025-01-15',
      time: '14:00 UTC',
      location: 'Online',
      description: 'Learn about the latest DeFi protocols on Algorand and how to maximize your yields',
      attendees: 245,
      maxAttendees: 500,
      isOnline: true,
      isFree: true,
      image: '/api/placeholder/300/200',
      organizer: 'AlgoWallet Team'
    },
    {
      id: '2',
      title: 'Crypto Security Best Practices',
      type: 'workshop',
      date: '2025-01-20',
      time: '18:00 UTC',
      location: 'San Francisco, CA',
      description: 'Hands-on workshop covering wallet security, key management, and safe trading practices',
      attendees: 45,
      maxAttendees: 50,
      isOnline: false,
      isFree: false,
      price: 25,
      image: '/api/placeholder/300/200',
      organizer: 'Crypto Security Group'
    },
    {
      id: '3',
      title: 'Blockchain Innovation Summit',
      type: 'conference',
      date: '2025-02-01',
      time: '09:00 UTC',
      location: 'New York, NY',
      description: 'Two-day conference featuring industry leaders discussing the future of blockchain',
      attendees: 856,
      maxAttendees: 1000,
      isOnline: false,
      isFree: false,
      price: 199,
      image: '/api/placeholder/300/200',
      organizer: 'Blockchain Foundation'
    },
    {
      id: '4',
      title: 'Local Crypto Meetup',
      type: 'meetup',
      date: '2025-01-25',
      time: '19:00 UTC',
      location: 'Austin, TX',
      description: 'Casual meetup for crypto enthusiasts to network and share experiences',
      attendees: 28,
      maxAttendees: 40,
      isOnline: false,
      isFree: true,
      image: '/api/placeholder/300/200',
      organizer: 'Austin Crypto Community'
    }
  ]);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('all');
  const [locationFilter, setLocationFilter] = React.useState('all');

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'webinar':
        return 'bg-blue-100 text-blue-800';
      case 'conference':
        return 'bg-purple-100 text-purple-800';
      case 'workshop':
        return 'bg-green-100 text-green-800';
      case 'meetup':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || event.type === typeFilter;
    const matchesLocation = locationFilter === 'all' ||
                          (locationFilter === 'online' && event.isOnline) ||
                          (locationFilter === 'offline' && !event.isOnline);
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Upcoming Events</h2>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
          Create Event
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none"
            >
              <option value="all">All Types</option>
              <option value="webinar">Webinar</option>
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
              <option value="meetup">Meetup</option>
            </select>
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none"
            >
              <option value="all">All Locations</option>
              <option value="online">Online Only</option>
              <option value="offline">In-Person Only</option>
            </select>
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none">
              <option value="all">All Dates</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="next-month">Next Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
                {event.isFree ? (
                  <span className="text-green-600 font-semibold text-sm">Free</span>
                ) : (
                  <span className="text-slate-900 font-semibold text-sm">${event.price}</span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {event.title}
              </h3>

              <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                {event.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(event.date)}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                  {event.isOnline && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      Online
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees}/{event.maxAttendees} attendees</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 mb-4">
                Organized by {event.organizer}
              </div>

              <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
                {event.attendees >= event.maxAttendees ? 'Waitlist' : 'Register'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No events found</h3>
          <p className="text-slate-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default EventsCalendar;
