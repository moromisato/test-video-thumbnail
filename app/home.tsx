import { StyleSheet, View, TextInput, Button, Text } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useState } from "react";
import { ExpoVideo } from "@/components/ExpoVideo";
import { ExpoAv } from "@/components/ExpoAv";
import { ExpoVideoThumbnail } from "@/components/ExpoThumbnail";

enum MediaPreview {
  expoVideo,
  expoAv,
  expoThumbnail,
}

const defaultVideoUri =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function HomeScreen() {
  const [draftUri, setDraftUri] = useState(defaultVideoUri);
  const [uri, setUri] = useState("");
  const [mediaPlayer, setMediaPlayer] = useState(MediaPreview.expoVideo);
  const isNotEmpty = uri.length > 0;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <View style={styles.playerContainer}>
          {isNotEmpty && mediaPlayer === MediaPreview.expoVideo && (
            <ExpoVideo uri={uri} />
          )}
          {!isNotEmpty && (
            <View style={styles.centeredContainer}>
              <Text style={styles.error}>No Video source</Text>
            </View>
          )}
        </View>
      }
    >
      <View style={styles.body}>
        <TextInput
          defaultValue={draftUri}
          onChangeText={setDraftUri}
          style={styles.uriInput}
        />
        <Button
          title="Start video"
          disabled={uri === draftUri}
          onPress={() => {
            setUri(draftUri);
          }}
        />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  playerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: 16,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  uriInput: {
    color: "black",
    borderWidth: 1,
    padding: 8,
    flex: 1,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
