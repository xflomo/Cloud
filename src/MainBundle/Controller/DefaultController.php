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
        $varTest = file_get_contents('C:/xampp/htdocs/Cloud/web/uploads/test.php');
        return $this->render('MainBundle:Default:index.html.twig', array(
            'content' => $varTest,
        ));
    }
}
