const Calendar = () => {
    // Sample meetings data
    const [meetings, setmeetings] = useState([
        { id: 1, title: 'Team Standup', start: '09:00', end: '09:30', color: 'bg-blue-200' },
        { id: 2, title: 'Product Review', start: '09:15', end: '10:00', color: 'bg-green-200' },
        { id: 3, title: 'Client Meeting', start: '11:00', end: '11:30', color: 'bg-purple-200' },
        { id: 4, title: 'Sprint Planning', start: '11:30', end: '12:30', color: 'bg-orange-200' }
    ]);

    // Convert time to pixels for positioning
    const timeToPixels = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return (hours * 60 + minutes) * 1.5; // 1.5px per minute
    };

    // Calculate position and width for meetings
    const getMeetingStyle = (meeting) => {
        const top = timeToPixels(meeting.start);
        const height = timeToPixels(meeting.end) - timeToPixels(meeting.start);
        return { top, height };
    };

    // Group overlapping meetings
    const getOverlappingGroups = () => {
        const groups = [];
        let currentGroup = [];

        meetings.sort((a, b) => timeToPixels(a.start) - timeToPixels(b.start));

        meetings.forEach(meeting => {
            if (currentGroup.length === 0) {
                currentGroup.push(meeting);
            } else {
                const lastMeeting = currentGroup[currentGroup.length - 1];
                if (timeToPixels(meeting.start) < timeToPixels(lastMeeting.end)) {
                    currentGroup.push(meeting);
                } else {
                    groups.push([...currentGroup]);
                    currentGroup = [meeting];
                }
            }
        });

        if (currentGroup.length > 0) {
            groups.push(currentGroup);
        }

        return groups;
    };

    return (
        <div className="w-full max-w-4xl p-4">
            <div className="flex">
                {/* Time column */}
                <div className="w-20 pr-2">
                    {[...Array(24)].map((val, index) => {
                        index += 1

                        return <div key={index - 1} className="h-24 text-sm text-gray-500">
                            {(index - 1) < 10 ? `0${index - 1}:00` : `${index - 1}:00`}
                        </div>
                    })}
                </div>

                {/* Calendar grid */}
                <div className="flex-1 relative border-l">
                    {/* Hour lines */}
                    {[...Array(24)].map((val, index) => {
                        index += 1
                        return < div key={index} className="h-24 border-b border-gray-200" />
                    })}

                    {/* Meetings */}
                    {getOverlappingGroups().map((group, groupIndex) => (
                        <div key={groupIndex}>
                            {group.map((meeting, index) => {
                                const { top, height } = getMeetingStyle(meeting);
                                const width = 100 / group.length;
                                const left = index * width;

                                return (
                                    <div
                                        key={meeting.id}
                                        className={`absolute rounded-lg p-2 shadow-sm ${meeting.color}`}
                                        style={{
                                            top: `${top}px`,
                                            height: `${height}px`,
                                            left: `${left}%`,
                                            width: `${width}%`
                                        }}
                                    >
                                        <div className="text-sm font-semibold">{meeting.title}</div>
                                        <div className="text-xs">{`${meeting.start} - ${meeting.end}`}</div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
