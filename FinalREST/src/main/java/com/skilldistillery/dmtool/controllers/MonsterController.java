package com.skilldistillery.dmtool.controllers;

import java.security.Principal;
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

import com.skilldistillery.dmtool.entities.Monster;
import com.skilldistillery.dmtool.services.MonsterService;

@RestController
@RequestMapping(path = "api")
@CrossOrigin({ "*", "http://localhost:4200" })
public class MonsterController {
	@Autowired
	private MonsterService monServ;

	@RequestMapping(path = "monster/ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}

	// Need to include user id in path to get all notes for a specific campaign
	@RequestMapping(path = "monster/all", method = RequestMethod.GET)
	public Set<Monster> index(HttpServletRequest req, HttpServletResponse res, Principal principal) {
		if (principal != null) {
			return monServ.index(principal.getName());
		}
		return monServ.index("admin");
	}

	@RequestMapping(path = "monster/{mid}")
	public Monster show(HttpServletRequest req, HttpServletResponse res, @PathVariable int mid, Principal principal) {
		return monServ.show(mid);
	}

	@RequestMapping(path = "monster", method = RequestMethod.POST)
	public Monster create(@RequestBody Monster monster, HttpServletRequest request, HttpServletResponse response,
			Principal principal) {
		Monster mon = monServ.create(principal.getName(), monster);

		if (mon != null) {
			response.setStatus(200);
			return mon;

		}
		response.setStatus(500);
		return mon;
	}

	@RequestMapping(path = "monster/{mid}", method = RequestMethod.PATCH)
	public Monster update(@PathVariable int mid, @RequestBody Monster monster, HttpServletRequest request,
			HttpServletResponse response, Principal principal) {
		Monster mon = monServ.update(principal.getName(), mid, monster);

		if (mon != null) {
			response.setStatus(200);
			return mon;

		}
		response.setStatus(500);
		return mon;
	}

	@RequestMapping(path = "monster/{mid}", method = RequestMethod.DELETE)
	public void destroy(@PathVariable int mid, HttpServletRequest request, HttpServletResponse response,
			Principal principal) {
		response.setStatus(500);
		if (monServ.checkAbilityToModify(principal.getName(), mid)) {
			monServ.destroy(mid);

			try {
				monServ.show(mid);
			} catch (Exception e) {
				response.setStatus(200);
			}
		}
	}

}