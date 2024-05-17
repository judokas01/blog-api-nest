/**
 * It is useful to implement this on objects that we know we want to deeply clone,
 * so that we can replace the internal implementation of the clone function for each object individually without refactoring later on (tailored for the object - e.g. for performance).
 *
 */
export interface Clonable<T> {
    clone(): T
}
