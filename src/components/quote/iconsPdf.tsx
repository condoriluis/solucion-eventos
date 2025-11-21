import { Text, View, StyleSheet, Svg, Circle, Path } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    marginLeft: 4,
    color: '#fff',
  },
});

type IconName = 'phone' | 'email' | 'link' | 'location' | 'facebook' | 'tiktok' | 'whatsapp';

type IconMap = {
  [key in IconName]: React.FC<{ color: string }>;
};

const icons: IconMap = {
  phone: ({ color }) => (
    <Path
      stroke={color}
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 11.8a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.1 1h3a2 2 0 0 1 2 1.72c.12.83.37 1.64.72 2.41a2 2 0 0 1-.45 2.11L7 8a16 16 0 0 0 9 9l.76-.37a2 2 0 0 1 2.11-.45c.77.35 1.58.6 2.41.72a2 2 0 0 1 1.72 2z"
    />
  ),
  email: ({ color }) => (
    <>
      <Circle stroke={color} cx='12' cy='12' r='4' />
      <Path stroke={color} d='M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8' />
    </>
  ),
  link: ({ color }) => (
    <>
      <Path stroke={color} d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <Path stroke={color} d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </>
  ),
  location: ({ color }) => (
    <>
      <Path stroke={color} d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <Circle stroke={color} cx="12" cy="10" r="3" />
    </>
  ),
  facebook: ({ color }) => (
    <Path
      stroke={color}
      d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
    />
  ),
  tiktok: ({ color }) => (
    <>
      <Path
        stroke={color}
        d="M21 7h-1a4 4 0 0 1-4-4h-4v11.5a2.5 2.5 0 1 1-4-2V8.18a6.5 6.5 0 1 0 8 6.32V9.92A8 8 0 0 0 20 11h1Z"
      />
    </>
  ),
  whatsapp: ({ color }) => (
    <Path
      stroke={color}
      d="M16.6 14c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1c-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5s.2-.3.4-.4c.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4S9.7 8.5 9.5 8c-.1-.7-.3-.7-.5-.7h-.5c-.2 0-.5.2-.6.3Q7 8.5 7 9.7c.1.9.4 1.8 1 2.6 1.1 1.6 2.5 2.9 4.2 3.7.5.2.9.4 1.4.5.5.2 1 .2 1.6.1.7-.1 1.3-.6 1.7-1.2.2-.4.2-.8.1-1.2zm2.5-9.1C15.2 1 8.9 1 5 4.9c-3.2 3.2-3.8 8.1-1.6 12L2 22l5.3-1.4c1.5.8 3.1 1.2 4.7 1.2 5.5 0 9.9-4.4 9.9-9.9.1-2.6-1-5.1-2.8-7m-2.7 14c-1.3.8-2.8 1.3-4.4 1.3-1.5 0-2.9-.4-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3c-2.4-4-1.2-9 2.7-11.5S16.6 3.7 19 7.5c2.4 3.9 1.3 9-2.6 11.4"
    />
  ),
};

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
};

const defaultSize = 24;

export const Icon: React.FC<IconProps> = ({ name, size = defaultSize, color = 'black' }) => {
  const Component = icons[name];
  return <Svg height={size} width={size} viewBox="0 0 24 24"><Component color={color} /></Svg>;
};

type IconTextProps = {
  icon: IconName;
  text: string;
};

export const IconText: React.FC<IconTextProps> = ({ icon, text }) => (
  <View style={styles.container}>
    <Icon size={14} name={icon} color="#fff" />
    <Text style={styles.text}>{text}</Text>
  </View>
);
