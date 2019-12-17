import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StatusBar,
  TouchableNativeFeedback,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import {SvgImage, Defs, Svg, Path, Mask} from 'react-native-svg';
import Icons39Menu from '../Icons/IconMenu';
import Icons8Like from '../Icons/IconLike';
import Icons14Comment5 from '../Icons/IconComment';

function PostsItem({
  auth,
  post: {user, body, likeCount, title, commentCount, createdAt, image},
}) {
  const [isVisible, setisVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
          }}>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.9)"
            barStyle="dark-content"
          />
          <View style={styles.modal}>
            <TouchableOpacity>
              <Text style={styles.modalText2}>Follow This Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.modalText}>Goto Post</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.modalText}>I Dont Want To See This</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setisVisible(!isVisible);
              }}>
              <Text style={styles.modalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        <View style={styles.rectangle3}>
          <View style={styles.oval1Row}>
            <Image
              source={{uri: user.picture}}
              style={{width: 38, height: 28, bottom: -10}}
            />

            <View style={styles.edwardKellyColumn}>
              <Text style={styles.edwardKelly}>{user.name}</Text>
              <Text style={styles.hoursAgo}>2 hours ago</Text>
            </View>
            <TouchableOpacity onPress={() => setisVisible(true)}>
              <Icons39Menu style={styles.icons39Menu}></Icons39Menu>
            </TouchableOpacity>
          </View>

          <View style={{}}>
            <Image source={{uri: image}} style={{width: '100%', height: 400}} />
          </View>

          <Text style={styles.sinceTheIntroducti}>{body}</Text>
          <View style={styles.group3}>
            <View style={styles.icons8LikeRow}>
              <TouchableHighlight>
                <Icons8Like style={styles.icons8Like}></Icons8Like>
              </TouchableHighlight>

              <Text style={styles.style3}>{likeCount}</Text>
              <TouchableHighlight>
                <Icons14Comment5
                  style={styles.icons14Comment5}></Icons14Comment5>
              </TouchableHighlight>

              <Text style={styles.style4}>{commentCount}</Text>
              <View style={styles.ovalStack}></View>
            </View>
          </View>
          <View style={{padding: 5}}>
            <TouchableHighlight>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  fontWeight: '100',
                  opacity: 0.7,
                  paddingLeft: 10,
                }}>
                View All Comments View
              </Text>
            </TouchableHighlight>
          </View>
          <View style={{paddingLeft: 10, flexDirection: 'row'}}>
            <TextInput
              placeholder="add comment"
              placeholderTextColor="grey"
              style={{
                fontSize: 14,
                top: 2,
                width: 310,
                height: 40,
                color: '#111',
                paddingLeft: 15,
                marginRight: 12,
                // marginLeft: 10,
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 20,
              }}
            />
            <TouchableHighlight
              style={{
                backgroundColor: 'grey',
                borderRadius: 80,
                justifyContent: 'center',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              <View>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Post</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 411,
    height: 'auto',
    marginTop: 20,
    alignItems: 'center',
  },
  rectangle3: {
    width: 400,
    height: 'auto',

    paddingBottom: 20,
    backgroundColor: 'rgba(36,42,55,1)',
    borderRadius: 8,
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowColor: 'rgba(0,0,0,1)',
    overflow: 'hidden',
    shadowOpacity: 1,
    shadowRadius: 20,
    borderWidth: 0.1,
    borderColor: 'white',
  },
  oval1: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },
  edwardKelly: {
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  hoursAgo: {
    backgroundColor: 'transparent',
    color: 'rgba(78,88,110,1)',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  edwardKellyColumn: {
    width: 90,
    marginLeft: 15,
    marginTop: 7,
    marginBottom: 3,
  },
  icons39Menu: {
    width: 30,
    height: 20,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',

    transform: [
      {
        rotate: '-90deg',
      },
    ],
    marginLeft: 180,
  },
  oval1Row: {
    height: 50,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 15,
  },
  relaxTravel: {
    backgroundColor: 'transparent',
    color: 'rgba(245,75,100,1)',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    marginTop: 18,
    marginLeft: 15,
  },
  sinceTheIntroducti: {
    paddingTop: 8,
    width: 350,
    height: 'auto',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    marginTop: 1,
    marginLeft: 15,
    textAlign: 'justify',
  },
  group3: {
    width: 315,
    height: 28,
    flexDirection: 'row',
    marginTop: 23,
    marginLeft: 15,
  },
  icons8Like: {
    width: 28,
    height: 28,
    backgroundColor: 'transparent',
  },
  style3: {
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    marginTop: 4,
  },
  icons14Comment5: {
    width: 28,
    height: 28,
    backgroundColor: 'transparent',
    marginLeft: 24,
  },
  style4: {
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    marginTop: 4,
  },
  oval: {
    top: 0,
    left: 34,
    width: 28,
    height: 28,
    backgroundColor: 'transparent',
    position: 'absolute',
    borderColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: 'rgba(234,236,239,1)',
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  ovalCopy2: {
    top: 0,
    left: 17,
    width: 28,
    height: 28,
    backgroundColor: 'transparent',
    position: 'absolute',
    borderColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: 'rgba(234,236,239,1)',
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  ovalCopy3: {
    top: 0,
    left: 0,
    width: 28,
    height: 28,
    backgroundColor: 'transparent',
    position: 'absolute',
    borderColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: 'rgba(234,236,239,1)',
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  ovalStack: {
    width: 62,
    height: 28,
    marginLeft: 118,
  },
  icons8LikeRow: {
    height: 28,
    flexDirection: 'row',
    flex: 1,
  },
  container7: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    backgroundColor: 'blue',
  },
  modal: {
    backgroundColor: '#999',
    height: 300,
    width: '80%',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 80,
    marginLeft: 40,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
  modalText: {
    fontSize: 25,
    color: 'black',
    borderBottomWidth: 2,

    padding: 6,
    borderColor: 'grey',
    textAlign: 'center',
  },
  modalText2: {
    fontSize: 25,
    color: 'black',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    padding: 6,
    borderColor: 'grey',
    textAlign: 'center',
  },
});

export default PostsItem;
