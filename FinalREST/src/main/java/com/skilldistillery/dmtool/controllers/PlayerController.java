package com.skilldistillery.dmtool.controllers;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.dmtool.entities.Player;
import com.skilldistillery.dmtool.services.PlayerService;

@RestController
@RequestMapping(path = "api")
@CrossOrigin({ "*", "http://localhost:4200" })
public class PlayerController {
	@Autowired
	private PlayerService playerServ;
	

	@RequestMapping(path = "player/ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}

	// Need to include campaign id in path to get all players for a specific campaign
	@RequestMapping(path = "player/all/{cid}", method = RequestMethod.GET)
	public Set<Player> index(@PathVariable int cid, HttpServletRequest req, HttpServletResponse res) {
		return playerServ.index(cid);
	}

	@RequestMapping(path = "player/{pid}")
	public Player show(HttpServletRequest req, HttpServletResponse res, @PathVariable int pid) {
		return playerServ.show(pid);
	}

	@RequestMapping(path = "player/{cid}", method = RequestMethod.POST)
	public Player create(@RequestBody Player player, @PathVariable int cid, HttpServletRequest request,
			HttpServletResponse response) {
		Player play = playerServ.create(cid, player);

		if (play != null) {
			response.setStatus(200);
			return play;

		}
		response.setStatus(500);
		return play;
	}

	@RequestMapping(path = "player/{pid}", method = RequestMethod.PUT)
	public Player update(@PathVariable int pid, @RequestBody Player player, HttpServletRequest request,
			HttpServletResponse response) {
		Player play = playerServ.update(pid, player);

		if (play != null) {
			response.setStatus(200);
			return play;

		}
		response.setStatus(500);
		return play;
	}

	@RequestMapping(path = "player/{pid}", method = RequestMethod.DELETE)
	public void destroy(@PathVariable int pid, HttpServletRequest request, HttpServletResponse response) {
		playerServ.destroy(pid);
		response.setStatus(500);
		try {
		playerServ.show(pid);
		}
		catch(Exception e) {
			response.setStatus(200);
		}
	}

}