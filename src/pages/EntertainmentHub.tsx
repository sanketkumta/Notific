import React from 'react';
import styled from 'styled-components';
import { Play, Music, Film, Tv, Gamepad2 } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #4834d4 0%, #686de0 100%);
  padding: 20px;
  color: white;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const CardTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MediaItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin: 8px 0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(5px);
  }
`;

const MediaIcon = styled.div`
  margin-right: 12px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
`;

const MediaInfo = styled.div`
  flex: 1;
`;

const MediaTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const MediaSubtitle = styled.div`
  font-size: 12px;
  opacity: 0.8;
`;

const Button = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin: 8px 8px 8px 0;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const PremiumBadge = styled.span`
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: bold;
  margin-left: 8px;
`;

export function EntertainmentHub() {
  return (
    <Container>
      <Header>
        <Title>
          <Play size={40} />
          Entertainment Hub
        </Title>
        <Subtitle>Your inflight entertainment collection</Subtitle>
      </Header>

      <Grid>
        <Card>
          <CardTitle>
            <Film size={24} />
            Featured Movies
            <PremiumBadge>PREMIUM</PremiumBadge>
          </CardTitle>

          <MediaItem>
            <MediaIcon><Film size={16} /></MediaIcon>
            <MediaInfo>
              <MediaTitle>Avengers: Endgame</MediaTitle>
              <MediaSubtitle>Action • 3h 1m • ⭐ 8.4</MediaSubtitle>
            </MediaInfo>
          </MediaItem>

          <MediaItem>
            <MediaIcon><Film size={16} /></MediaIcon>
            <MediaInfo>
              <MediaTitle>The Grand Budapest Hotel</MediaTitle>
              <MediaSubtitle>Comedy • 1h 39m • ⭐ 8.1</MediaSubtitle>
            </MediaInfo>
          </MediaItem>

          <MediaItem>
            <MediaIcon><Film size={16} /></MediaIcon>
            <MediaInfo>
              <MediaTitle>Inception</MediaTitle>
              <MediaSubtitle>Sci-Fi • 2h 28m • ⭐ 8.8</MediaSubtitle>
            </MediaInfo>
          </MediaItem>

          <Button>Browse All Movies</Button>
          <Button>My Watchlist</Button>
        </Card>

        <Card>
          <CardTitle>
            <Music size={24} />
            Music & Audio
          </CardTitle>

          <MediaItem>
            <MediaIcon><Music size={16} /></MediaIcon>
            <MediaInfo>
              <MediaTitle>Chill Vibes Playlist</MediaTitle>
              <MediaSubtitle>Relaxing • 45 songs • 2h 30m</MediaSubtitle>
            </MediaInfo>
          </MediaItem>

          <MediaItem>
            <MediaIcon><Music size={16} /></MediaIcon>
            <MediaInfo>
              <MediaTitle>Top 40 Hits</MediaTitle>
              <MediaSubtitle>Pop • 40 songs • 2h 45m</MediaSubtitle>
            </MediaInfo>
          </MediaItem>

          <MediaItem>
            <MediaIcon><Music size={16} /></MediaIcon>
            <MediaInfo>
              <MediaTitle>Classical Essentials</MediaTitle>
              <MediaSubtitle>Classical • 25 pieces • 3h 15m</MediaSubtitle>
            </MediaInfo>
          </MediaItem>

          <Button>Music Library</Button>
          <Button>Podcasts</Button>
          <Button>Audio Books</Button>
        </Card>

        <Card>
          <CardTitle>
            <Tv size={24} />
            TV Shows & Series
          </CardTitle>

          <MediaItem>
            <MediaIcon><Tv size={16} /></MediaIcon>
            <MediaInfo>
              <MediaTitle>Breaking Bad</MediaTitle>
              <MediaSubtitle>Drama • S5 E16 • 49m</MediaSubtitle>
            </MediaInfo>
          </MediaItem>

          <MediaItem>
            <MediaIcon><Tv size={16} /></MediaIcon>
            <MediaInfo>
              <MediaTitle>The Office</MediaTitle>
              <MediaSubtitle>Comedy • S3 E14 • 22m</MediaSubtitle>
            </MediaInfo>
          </MediaItem>

          <MediaItem>
            <MediaIcon><Tv size={16} /></MediaIcon>
            <MediaInfo>
              <MediaTitle>Planet Earth</MediaTitle>
              <MediaSubtitle>Documentary • S2 E3 • 50m</MediaSubtitle>
            </MediaInfo>
          </MediaItem>

          <Button>Browse Series</Button>
          <Button>Continue Watching</Button>
        </Card>

        <Card>
          <CardTitle>
            <Gamepad2 size={24} />
            Games & Interactive
          </CardTitle>

          <MediaItem>
            <MediaIcon><Gamepad2 size={16} /></MediaIcon>
            <MediaInfo>
              <MediaTitle>Sudoku Challenge</MediaTitle>
              <MediaSubtitle>Puzzle • Easy to Expert levels</MediaSubtitle>
            </MediaInfo>
          </MediaItem>

          <MediaItem>
            <MediaIcon><Gamepad2 size={16} /></MediaIcon>
            <MediaInfo>
              <MediaTitle>Flight Simulator</MediaTitle>
              <MediaSubtitle>Simulation • Beginner friendly</MediaSubtitle>
            </MediaInfo>
          </MediaItem>

          <MediaItem>
            <MediaIcon><Gamepad2 size={16} /></MediaIcon>
            <MediaInfo>
              <MediaTitle>Trivia Time</MediaTitle>
              <MediaSubtitle>Quiz • Multiple categories</MediaSubtitle>
            </MediaInfo>
          </MediaItem>

          <Button>Game Center</Button>
          <Button>Multiplayer Games</Button>
          <Button>High Scores</Button>
        </Card>
      </Grid>
    </Container>
  );
}