import Box from '@mui/material/Box';

import VideoPlayListCards from 'src/components/video-play-list-card/video-play-list-card';

// import VideoPlayListCards from 'src/components/video-play-list-card/video-playlist-card';

// ----------------------------------------------------------------------

export function VideoPlayList({ title, list, ...other }) {
  const videoData = [
    { title: '1. How to use Pabbly Hook', videoId: 'CoIfgN0tfhE', image:'pabbly-hook.png' },
    { title: '2. What is Triggers  Action', videoId: 'CoIfgN0tfhE', image:'1. What is Triggers  Action.png' },
    { title: '3. How to use Webhooks', videoId: 'your-youtube-video-id', image:'2. How to use Webhooks.png' },
    { title: '4. How to use Email Parser', videoId: 'your-youtube-video-id',  image:'3. How to use Email Parser.png' },
    { title: '5. How to use Filters', videoId: 'your-youtube-video-id',  image:'4. How to use Filters.png' },
    { title: '6. How to use Iterator', videoId: 'your-youtube-video-id',  image:'6. How to use Iterator.png'},
    { title: '7. How to use API Module', videoId: 'your-youtube-video-id',  image:'7. How to use API Module.png' },
    { title: '8. Google Sheets Triggers', videoId: 'your-youtube-video-id',  image:'8. Google Sheets Triggers.png'},
    
  ];

  return (
    <Box
      sx={{
        mt: 3,
        gap: 3,
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' },
      }}
      {...other}
    >
      {videoData.map((video, index) => (
        <VideoPlayListCards
          key={index}
          Videotitle={video.title}
          buttonText="Watch Now"
          thumbnailimage={video.image}
          videoId={video.videoId}
          
        />
      ))}
    </Box>
  );
}
