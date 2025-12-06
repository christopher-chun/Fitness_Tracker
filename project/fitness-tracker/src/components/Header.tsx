import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type HeaderProps = {
  title: string;
  onAddPress?: () => void;
};

export default function Header({ title, onAddPress }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {onAddPress && ( 
        <TouchableOpacity onPress={onAddPress} style={styles.addButton}> 
          <Text style={styles.addButtonText}>+ New</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000000ff',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#000000ff',
    fontWeight: '600',
    fontSize: 14,
  },
});