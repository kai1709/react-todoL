import React from 'react';

export default class Thumb extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loaded: false};
  }

  onLoadImage() {
    this.setState({loaded: true});
  }

  componentDidMount() {
    let imgTag = React.findDOMNode(this);
    let imgSrc = imgTag.getAttribute('src');
    let img = new window.Image();
    img.onload = this.onLoadImage.bind(this);
    img.src = imgSrc;
  }

  render() {
    return <img {...this.props} src={ this.props.src + "?" + (Math.random()*3454633).toString() } className={"image" + (this.state.loaded ? " loaded" : "")} />
  }

}
