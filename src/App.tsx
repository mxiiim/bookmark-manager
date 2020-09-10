import React, { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './App.module.scss';

import { useAuth } from './contexts/auth';
import Brand from './components/Brand';
import Authentication from './components/Authentication';
import BookmarkTree from './components/BookmarkTree';
import Bookmarks from './components/Bookmarks';
import { exitVariants } from './lib/motion-variants';

// const BookmarkTree = React.lazy(() => import('./components/BookmarkTree'));
// const Bookmarks = React.lazy(() => import('./components/Bookmarks'));

const sidebarVariants = {
  start: { width: '45%' },
  expanded: { width: '50%', transition: { type: 'spring' } },
  narrow: { width: 400, transition: { type: 'spring' } },
};

const App: FC = () => {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <motion.div
        initial="start"
        animate={user ? 'narrow' : 'expanded'}
        variants={sidebarVariants}
        className={styles.sidebar}
      >
        <AnimatePresence exitBeforeEnter>
          {!user && (
            <motion.div
              key="brand"
              animate="animate"
              exit="exit"
              variants={exitVariants}
              className={styles.brandWrapper}
            >
              <Brand />
            </motion.div>
          )}
          {user && <BookmarkTree />}
        </AnimatePresence>
      </motion.div>
      <div className={styles.content}>
        <AnimatePresence exitBeforeEnter>
          {!user && (
            <motion.div
              key="authentication"
              animate="animate"
              exit="exit"
              variants={exitVariants}
            >
              <Authentication />
            </motion.div>
          )}
          {user && <Bookmarks />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
