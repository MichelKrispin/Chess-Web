import React from 'react';

import K from '../images/Kb.png';
import k from '../images/kw.png';
import N from '../images/Nb.png';
import n from '../images/nw.png';
import P from '../images/Pb.png';
import p from '../images/pw.png';
import Q from '../images/Qb.png';
import q from '../images/qw.png';
import R from '../images/Rb.png';
import r from '../images/rw.png';
import B from '../images/Bb.png';
import b from '../images/bw.png';

const images = Object.freeze({ K, k, N, n, P, p, Q, q, R, r, B, b});

const ImageCard = (figure) => (<img alt={figure} src={images[figure]} />);

export default ImageCard;