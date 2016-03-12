# Infinite Scroll React Component

This is a simple React Component for a Infinite Scrolling Page.

Nothing fancy, only a component that calls a passed function whenever a threshold from the bottom
is reached.

## Getting Started

Install react component:

`npm install --save react-component-infinite-scroll`

Import component in your file

`import InfiniteScroll from 'react-component-infinite-scroll';`

Use it in your component
```
class PageableList extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object
  };

  nextPage() {                  // whatever method you want InfiniteScroll to call
    this.props.actions.fetchImages();
  }

  render() {
    return (
      <InfiniteScroll nextPage={ this.nextPage.bind(this) } threshold={ 600 } >
        <div className="list">
          <h1 className="title">List</h1>
          <VerticalList { ...this.props } />
        </div>
      </InfiniteScroll>
    );
  }
}
```

`InfiniteScroll` component will call the method passed in the `nextPage` `prop` whenever it hits
the `threshold` from the bottom of the page. Which means that if the method updates the state,
it will re-render the Component.
