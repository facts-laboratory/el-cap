import styles from './showcase-widget.module.css';

/* eslint-disable-next-line */
export interface ShowcaseWidgetProps {}

export function ShowcaseWidget(props: ShowcaseWidgetProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ShowcaseWidget!</h1>
    </div>
  );
}

export default ShowcaseWidget;
