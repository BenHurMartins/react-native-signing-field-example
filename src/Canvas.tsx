import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import {Path, Svg} from 'react-native-svg';

type TCanvas = {
  path: String[];
};

const Canvas = () => {
  const [paths, setPaths] = useState<TCanvas[]>([]);

  const setNewPath = (x: number, y: number) => {
    setPaths(prev => {
      return [...prev, {path: [`M${x} ${y}`]}];
    });
  };
  const updatePath = (x: number, y: number) => {
    setPaths(prev => {
      const currentPath = paths[paths.length - 1];
      currentPath.path.push(`L${x} ${y}`);

      return [...prev.slice(0, -1), currentPath];
    });
  };

  const gesture = Gesture.Pan()
    .onBegin(({x, y}) => {
      runOnJS(setNewPath)(x, y);
    })
    .onUpdate(({x, y}) => {
      runOnJS(updatePath)(x, y);
    });

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.canvas}>
        <Svg>
          {paths.map(({path}, i) => {
            return (
              <Path
                key={i}
                d={`${path.join(' ')}`}
                fill="none"
                strokeWidth={'2px'}
                stroke={'red'}
              />
            );
          })}
        </Svg>
      </View>
    </GestureDetector>
  );
};

export default Canvas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    width: 300,
    height: 300,
    borderWidth: 1,
    margin: 30,
  },
});
