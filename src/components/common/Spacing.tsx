interface Props {
  height: number;
}
const Spacing = ({ height }: Props) => {
  return <div style={{ height: `${height}px` }} />;
};

export default Spacing;
