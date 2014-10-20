/**
 * Produces the same result as React.addons.classSet
 * @param  {object} classes
 * @return {string}
 *
 * @author Ciro S. Costa <https://github.com/cirocosta>
 */

module.exports = (classes) => {
  return typeof classes !== 'object' ?
    Array.prototype.join.call(arguments, ' ') :
    Object.keys(classes).filter((className) => classes[className]).join(' ');
};
