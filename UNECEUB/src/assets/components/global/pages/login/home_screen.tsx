import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, // Componente TextInput importado corretamente
  Image 
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

// =========================================================================
// Definição da Paleta de Cores da UneCEUB
// =========================================================================
const colors = {
  primary: '#4F1E7F',     // Roxo Principal (Botões/Ícones)
  logoAccent: '#BF0087',  // Lilás/Magenta (Destaque)
  background: '#FFFFFF',  // Fundo Branco
  text: '#000000',        // Texto Preto
  lightText: '#666666',   // Texto Secundário/Claro
  inputBackground: '#F0F0F0', // Fundo da barra de pesquisa
  borderColor: '#E0E0E0', // Linhas e bordas
};

// Dados de simulação para o post
const mockPost = {
  user: 'CEUB',
  time: '3 semanas',
  edited: '2d · Editado',
  contentTitle: 'A NOTA MÁXIMA CHEGOU! 🏆',
  imageContent: 'O CEUB É NOTA MÁXIMA NO MEC',
  likes: 54,
  comments: 8,
  reposts: 8,
};

// Componente para a Barra de Navegação Inferior
interface BottomNavBarProps {
  onLogout: () => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ onLogout }) => (
  <View style={styles.navBar}>
    <TouchableOpacity style={styles.navItem}>
      <MaterialIcons name="home" size={24} color={colors.primary} />
      <Text style={[styles.navText, { color: colors.primary }]}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <MaterialIcons name="group" size={24} color={colors.lightText} />
      <Text style={styles.navText}>Conexões</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <MaterialIcons name="add-circle" size={40} color={colors.primary} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <MaterialIcons name="event" size={24} color={colors.lightText} />
      <Text style={styles.navText}>Eventos</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onLogout} style={styles.navItem}>
      <MaterialIcons name="person" size={24} color={colors.lightText} />
      <Text style={styles.navText}>Perfil</Text>
    </TouchableOpacity>
  </View>
);

// Componente para o Post de Notícia
const Post: React.FC = () => (
  <View style={styles.postContainer}>
    {/* Cabeçalho do Post */}
    <View style={styles.postHeader}>
      <View style={styles.profileInfo}>
        <View style={styles.ceubLogoPlaceholder}>
            <Text style={styles.ceubLogoText}>CEUB</Text>
        </View>
        <View>
          <Text style={styles.postUser}>{mockPost.user}</Text>
          <Text style={styles.postMeta}>{mockPost.time} · {mockPost.edited}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.connectButton}>
        <MaterialIcons name="person-add" size={18} color={colors.primary} />
        <Text style={styles.connectButtonText}>Conectar</Text>
      </TouchableOpacity>
    </View>

    {/* Título e Conteúdo Principal */}
    <Text style={styles.postTitle}>{mockPost.contentTitle}</Text>

    {/* Imagem do Post (Recriando a imagem com cores e texto) */}
    <View style={styles.postImagePlaceholder}>
      <Text style={styles.imageContentText}>{mockPost.imageContent}</Text>
      <View style={styles.imageOverlayTextContainer}>
          <Text style={styles.imageOverlayText}>CEUB</Text>
      </View>
    </View>

    {/* Estatísticas */}
    <View style={styles.statsContainer}>
      <View style={styles.likesIcons}>
        <Text style={{backgroundColor: colors.primary, color: 'white', borderRadius: 10, paddingHorizontal: 4, marginRight: 2, fontSize: 10}}>5</Text>
        <Text style={{backgroundColor: colors.logoAccent, color: 'white', borderRadius: 10, paddingHorizontal: 4, marginRight: 5, fontSize: 10}}>1</Text>
        <Text style={styles.statsText}>{mockPost.likes} Curtidas</Text>
      </View>
      <Text style={styles.statsText}>{mockPost.comments} comentários · {mockPost.reposts} repostagens</Text>
    </View>

    {/* Barra de Ações */}
    <View style={styles.actionsBar}>
      <TouchableOpacity style={styles.actionButton}>
        <FontAwesome5 name="thumbs-up" size={18} color={colors.lightText} />
        <Text style={styles.actionText}>Curtir</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <FontAwesome5 name="comment" size={18} color={colors.lightText} />
        <Text style={styles.actionText}>Comentar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <FontAwesome5 name="share" size={18} color={colors.lightText} />
        <Text style={styles.actionText}>Rep</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.postDivider} />
  </View>
);


const HomeScreen: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* Barra de Pesquisa */}
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={24} color={colors.lightText} />
          <TextInput // Uso do TextInput
            placeholder="Networking..."
            placeholderTextColor={colors.lightText}
            style={styles.searchInput}
          />
        </View>
        {/* Notificações */}
        <MaterialIcons name="notifications-none" size={24} color={colors.lightText} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Simulação do Post de Exemplo */}
        <View style={styles.suggestedPostContainer}>
            <Image 
                source={{ uri: 'https://placehold.co/40x40/666666/FFFFFF?text=G' }}
                style={styles.smallAvatar}
            />
            <Text style={styles.suggestedPostText}>Gustavo Guanabara gostou dessa postagem</Text>
            <MaterialIcons name="more-vert" size={24} color={colors.lightText} />
        </View>
        
        <Post />
        
        {/* Post de Perfil (Para replicar a segunda postagem da imagem) */}
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <View style={styles.profileInfo}>
                    <Image 
                        source={{ uri: 'https://placehold.co/40x40/333333/FFFFFF?text=BB' }}
                        style={styles.smallAvatar}
                    />
                    <View>
                        <Text style={styles.postUser}>Beatriz Bruna</Text>
                        <Text style={styles.postMeta}>3 semanas</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.connectButton}>
                    <MaterialIcons name="person-add" size={18} color={colors.primary} />
                    <Text style={styles.connectButtonText}>Conectar</Text>
                </TouchableOpacity>
            </View>
        </View>

      </ScrollView>

      <BottomNavBar onLogout={onLogout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    backgroundColor: colors.background,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.text,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  
  // Estilos de Post
  postContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ceubLogoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  ceubLogoText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.background,
  },
  smallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  postMeta: {
    fontSize: 12,
    color: colors.lightText,
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  connectButtonText: {
    marginLeft: 5,
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  postImagePlaceholder: {
    width: '100%',
    height: 400,
    backgroundColor: colors.primary, // Roxo Escuro como base
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
    padding: 20,
  },
  imageContentText: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.logoAccent, // Lilás/Magenta para destaque
    textAlign: 'center',
    lineHeight: 50,
    letterSpacing: 2,
  },
  imageOverlayTextContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: colors.logoAccent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
  },
  imageOverlayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.background,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  likesIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 13,
    color: colors.lightText,
  },
  actionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  actionText: {
    marginLeft: 8,
    color: colors.lightText,
    fontSize: 14,
  },
  postDivider: {
    height: 10,
    backgroundColor: colors.inputBackground, // Divisor sutil
  },
  suggestedPostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  suggestedPostText: {
    flex: 1,
    marginLeft: 10,
    color: colors.lightText,
    fontSize: 14,
  },

  // Estilos da Barra de Navegação Inferior
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
    paddingHorizontal: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 10,
    color: colors.lightText,
  },
});

export default HomeScreen;