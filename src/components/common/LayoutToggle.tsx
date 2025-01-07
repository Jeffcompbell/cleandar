import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

interface LayoutToggleProps {
  layout: 'grid' | 'list';
  onLayoutChange: (layout: 'grid' | 'list') => void;
}

export const LayoutToggle: React.FC<LayoutToggleProps> = ({
  layout,
  onLayoutChange,
}) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon="view-grid"
        selected={layout === 'grid'}
        onPress={() => onLayoutChange('grid')}
      />
      <IconButton
        icon="view-list"
        selected={layout === 'list'}
        onPress={() => onLayoutChange('list')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
  },
}); 