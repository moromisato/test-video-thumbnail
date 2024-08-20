import { StyleSheet, Text, View } from 'react-native';

import { useCallback, useMemo, useState } from 'react';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';

interface ExpoAvProps {
  uri: string
}

export function ExpoAv({ uri }: ExpoAvProps) {
  const source = useMemo(() => ({ uri }), [uri])
  const [error, setError] = useState<null | string>(null)

  return (
    <>
      <Video
        style={styles.container}
        source={source}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        onLoad={() => {console.log('onLoad')}}
        onError={setError}
      />
      {Boolean(error) && (<View style={styles.centeredContainer}>
        <Text style={styles.error}>{error}</Text>
      </View>)}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    padding: 16
  },
  error: {
    color: 'red',
    textAlign: 'center'
  },
});
