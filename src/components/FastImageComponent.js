import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';

const FastImageComponent = ({
  source,
  style,
  resizeMode = FastImage.resizeMode.cover,
  showLoader = true,
  loaderColor = '#000',
  priority = FastImage.priority.normal,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Handle image loading events
  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  // Prepare image source
  const imageSource = typeof source === 'string' 
    ? { uri: source } 
    : source;

  // Add priority to source if it has a URI
  if (imageSource.uri) {
    imageSource.priority = priority;
    
    // Handle cache control
    imageSource.cache = FastImage.cacheControl.immutable;
  }

  return (
    <View style={[styles.container, style]}>
      <FastImage
        source={imageSource}
        style={styles.image}
        resizeMode={resizeMode}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        {...props}
      />
      
      {showLoader && loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color={loaderColor} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default FastImageComponent; 