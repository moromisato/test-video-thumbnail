import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { PlayerError, useVideoPlayer, VideoPlayerStatus, VideoView } from 'expo-video';
import { useCallback, useEffect, useState } from 'react';

interface ExpoVideoProps {
  uri: string
}


export function ExpoVideo({ uri }: ExpoVideoProps) {
  const player = useVideoPlayer(uri);

  const [status, setStatus] = useState(player.status)
  const [error, setError] = useState<string | null>(null)
  
  const onStatus = useCallback((newStatus: VideoPlayerStatus, oldStatus: VideoPlayerStatus, statusError: PlayerError) => {
    setStatus(newStatus)

    if (statusError) {
      setError(statusError.message)
    } else {
      setError(null)
    }
  }, [uri])

  useEffect(() => {
    const subscriptionVideoStatus = player.addListener(
      'statusChange',
      onStatus,
    )

    return () => {
      subscriptionVideoStatus.remove()
    }
  }, [setStatus, player])

  return (
    <>
      <VideoView
        style={styles.container}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
      {status === 'loading' && (
        <View style={styles.centeredContainer}>
          <ActivityIndicator color="white" />
        </View>
      )}
      {status === 'error' && (
        <View style={styles.centeredContainer}>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 16,
    position: 'absolute',
  },
  error: {
    color: 'red',
    textAlign: 'center'
  },
});
