import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PostsItem from './PostsItem';
import {getPosts} from '../../actions/posts';
import {logout} from '../../actions/auth';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Redirect} from 'react-router-native';
import SearchBar from '../utils/SearchBar';
const Posts = ({getPosts, logout, auth, post: {posts, loading}}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <View style={{backgroundColor: 'rgba(36,42,55,1)'}}>
      <StatusBar backgroundColor="rgba(36,42,55,1)" barStyle="light-content" />
      <View>
        <SearchBar />
      </View>
      <ScrollView style={{marginBottom: 90}}>
        {posts.map(post => (
          <PostsItem key={post._id} post={post} />
        ))}
      </ScrollView>
    </View>
  );
};
Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object,
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default connect(mapStateToProps, {getPosts, logout})(Posts);

// loading ? (
//   <View style={styles.container}>
//     <ActivityIndicator size="large" color="#fffff" />
//   </View>
// ) : (
//     <View>
//       <View style={{ padding: 12, textAlign: 'center', margin: 7 }}>
//         <View>
//           {auth ? (
//             <Text style={{ fontSize: 19, color: 'green', fontWeight: 'bold' }}>
//               Welcome {auth.user.name}
//             </Text>
//           ) : (
//               <Redirect to="/login" />
//             )}
//         </View>
//         <Text style={{ fontSize: 19 }}>Posts</Text>

//         <Text
//           onPress={() => {
//             logout();
//             <Redirect to="/login" />;
//           }}>
//           Logout
//         </Text>
//       </View>

//       <View>
//         <View>
//           {posts.map(post => (
//             <PostItem key={post._id} post={post} />
//           ))}
//         </View>
//       </View>
//     </View>