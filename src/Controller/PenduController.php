<?php

namespace App\Controller;

use App\Repository\PenduWordRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PenduController extends AbstractController
{
    #[Route('/pendu/facile', name: 'app_pendu_easy')]
    public function penduEasy(): Response
    {
        return $this->render('pendu/pendu.easy.html.twig', []);
    }

    #[Route('/pendu/difficile', name: 'app_pendu_hard')]
    public function penduHard(): Response
    {
        return $this->render('pendu/pendu.hard.html.twig', []);
    }

    #[Route('/pendu/words', name: 'app_pendu_words', options: ['expose' => true])]
    public function index(PenduWordRepository $penduWordRepository): JsonResponse
    {
        $wordsArr = [];
        $words = $penduWordRepository->findAll();

        foreach($words as $word) {
            $wordsArr[] = (string)$word->getWord();
        }

        return new JsonResponse($wordsArr);
    }
}
