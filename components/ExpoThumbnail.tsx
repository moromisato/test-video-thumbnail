import { ActivityIndicator, Image, InteractionManager, StyleSheet, Text, View } from 'react-native';

import { useEffect, useRef, useState } from 'react';
import { getThumbnailAsync } from 'expo-video-thumbnails';

interface ExpoThumbnailProps {
  uri: string
}

export function ExpoVideoThumbnail({ uri }: ExpoThumbnailProps) {
  const prevUri = useRef<string | null>(null)
  const [thumbnailSource, setThumbnailSource] = useState<{uri: string} | { error: string } | { loading: true } | null>(null)

  useEffect(() => {
    if (uri !== prevUri.current) {
      prevUri.current = uri
      setThumbnailSource({ loading: true })

      setTimeout(() => {
        getThumbnailAsync(uri)
          .then(value => setThumbnailSource({ uri: value.uri }))
          .catch(reason => setThumbnailSource({ error: reason }))
      }, 100)
    }
  }, [uri])


  if (!thumbnailSource) {
    return null
  }


  if ('loading' in thumbnailSource) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator color="white" />
      </View>
    )
  }

  if ('error' in thumbnailSource) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.error}>{JSON.stringify(thumbnailSource.error, null, 4)}</Text>
      </View>
    )
  }

  return (
    <Image
      source={thumbnailSource}
      style={styles.container}
    />
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
  },
  error: {
    color: 'red',
    textAlign: 'center'
  },
});
