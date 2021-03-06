<?php

namespace MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     */
    public function indexAction()
    {
        $varTest = file_get_contents('uploads/test.php');
        return $this->render('MainBundle:Default:index.html.twig');
    }

    /**
     * @Route("/file")
     */
    public function fileAction()
    {
        $varTest = file_get_contents('uploads/test.php');
        return $this->render('MainBundle:Pages:fileView.html.twig', array(
            'content' => $varTest,
        ));
    }
}
