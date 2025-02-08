const icons = import.meta.glob('../assets/img/icons/types/*.png', { eager: true });

const formattedIcons = Object.fromEntries(
  Object.entries(icons).map(([path, module]) => {
    const iconName = path.split('/').pop().replace('.png', '');
    return [iconName, module.default];
  })
);

export default formattedIcons;
